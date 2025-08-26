/* eslint-disable tailwindcss/no-contradicting-classname */
"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as d3 from "d3"
import { useTheme } from "next-themes"

import { type OperatorStatisticItem } from "@/types/api/statistics"
import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"
import { Spinner } from "@/components/ui/spinner"
import { getCountryColorCanvas } from "@/components/charts/worldmap/colors"
import { getFlagEmojiByCountryName } from "@/components/charts/worldmap/country-flag-emojies"

import worldGeoJson from "./world.json"

interface MapProps {
  data?: OperatorStatisticItem[]
  width?: number
  height?: number
  className?: string
}

interface HexagonData {
  x: number
  y: number
  country?: string | null
  value?: number
  lat: number
  lng: number
}

interface CountryFeature {
  type: "Feature"
  geometry: {
    type:
      | "Polygon"
      | "MultiPolygon"
      | "Point"
      | "MultiPoint"
      | "LineString"
      | "MultiLineString"
    coordinates: number[][][] | number[][][][]
  }
  properties: {
    NAME?: string
    name?: string
    NAME_EN?: string
    [key: string]: string | number | boolean | null | undefined
  }
}

// Function to draw hexagon on canvas with flat-top orientation (better for honeycomb)
const drawHexagon = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  fillColor: string
): void => {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    // Start from flat top (add π/2 offset) for proper honeycomb orientation
    const angle = (Math.PI / 3) * i + Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.closePath()
  ctx.fillStyle = fillColor
  ctx.fill()
}

// Function to check if a point is inside a hexagon
const isPointInHexagon = (
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number
): boolean => {
  const dx = pointX - centerX
  const dy = pointY - centerY
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance <= radius
}

// Function to generate hexagonal grid
const generateHexagonalGrid = (
  width: number,
  height: number,
  hexRadius: number,
  projection: d3.GeoProjection
): HexagonData[] => {
  const hexagons: HexagonData[] = []

  // Calculate hexagon dimensions for true honeycomb tessellation
  // const hexWidth = hexRadius * 2
  const hexHeight = hexRadius * Math.sqrt(3)

  // In a true honeycomb pattern:
  // - Horizontal spacing between centers: 3/4 of hexagon width (1.5 * radius)
  // - Vertical spacing between rows: 3/4 of hexagon height
  const horizontalSpacing = hexRadius * 1.5
  const verticalSpacing = hexHeight * 0.75

  // Calculate grid dimensions with padding
  const cols = Math.ceil(width / horizontalSpacing) + 4
  const rows = Math.ceil(height / verticalSpacing) + 4

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // True honeycomb offset: alternate rows are shifted by half the horizontal spacing
      const isOddRow = row % 2 === 1
      const xOffset = isOddRow ? horizontalSpacing / 2 : 0

      const x = col * horizontalSpacing + xOffset - horizontalSpacing
      const y = row * verticalSpacing - verticalSpacing

      // Skip if outside the visible area (with some margin)
      if (
        x < -hexRadius ||
        x > width + hexRadius ||
        y < -hexRadius ||
        y > height + hexRadius
      ) {
        continue
      }

      // Convert screen coordinates back to lat/lng
      const [lng, lat] = projection.invert?.([x, y]) || [0, 0]

      // Normalize longitude to prevent wrapping issues
      const normalizedLng = ((lng + 180) % 360) - 180

      // Only include hexagons within reasonable world bounds
      if (
        lat >= -90 &&
        lat <= 90 &&
        normalizedLng >= -180 &&
        normalizedLng <= 180
      ) {
        hexagons.push({
          x,
          y,
          lat,
          lng: normalizedLng,
        })
      }
    }
  }

  return hexagons
}

// Function to determine if a point is inside a country
const isPointInCountry = (
  lat: number,
  lng: number,
  features: CountryFeature[]
): { country: string | null; feature: CountryFeature | null } => {
  const point: [number, number] = [lng, lat]

  for (const feature of features) {
    if (feature.geometry.type === "Polygon") {
      if (d3.geoContains(feature as d3.GeoPermissibleObjects, point)) {
        const countryName =
          feature.properties.NAME ||
          feature.properties.name ||
          feature.properties.NAME_EN
        return { country: countryName || null, feature }
      }
    } else if (feature.geometry.type === "MultiPolygon") {
      if (d3.geoContains(feature as d3.GeoPermissibleObjects, point)) {
        const countryName =
          feature.properties.NAME ||
          feature.properties.name ||
          feature.properties.NAME_EN
        return { country: countryName || null, feature }
      }
    }
  }

  return { country: null, feature: null }
}

const WorldMap: React.FC<MapProps> = ({
  data,
  width = 600,
  height = 400,
  className = "",
}) => {
  const { theme } = useTheme() as { theme: "dark" | "light" }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hexagonDataRef = useRef<HexagonData[]>([])
  const visualHexRadiusRef = useRef<number>(0)

  const countryData = useMemo(() => {
    return (
      data?.reduce(
        (acc, item) => {
          acc[item.name] = item
          return acc
        },
        {} as Record<string, OperatorStatisticItem>
      ) || {}
    )
  }, [data])

  // Mouse interaction handlers for Canvas
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current || !tooltipRef.current) return

      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const mouseX = (event.clientX - rect.left) * scaleX
      const mouseY = (event.clientY - rect.top) * scaleY

      // Find hexagon under mouse
      const hoveredHex = hexagonDataRef.current.find((hex) =>
        isPointInHexagon(
          mouseX,
          mouseY,
          hex.x,
          hex.y,
          visualHexRadiusRef.current
        )
      )

      const tooltip = d3.select(tooltipRef.current)

      if (hoveredHex && hoveredHex.country) {
        // Show tooltip
        tooltip.transition().duration(200).style("opacity", "1")
        tooltip
          .html(
            `
          <strong>${getFlagEmojiByCountryName(hoveredHex.country || "Unknown")} ${
            hoveredHex.country || "Unknown"
          }</strong>
          ${hoveredHex.country ? percentageFormatter.format(countryData[hoveredHex.country]?.percentage || 0) : "0%"}
        `
          )
          .style("left", event.clientX + 28 + "px")
          .style("top", event.clientY - 28 + "px")

        // Change cursor
        canvas.style.cursor = "pointer"
      } else {
        // Hide tooltip
        tooltip.transition().duration(500).style("opacity", "0")
        canvas.style.cursor = "default"
      }
    },
    [countryData]
  )

  const handleMouseLeave = useCallback(() => {
    if (!tooltipRef.current || !canvasRef.current) return

    const tooltip = d3.select(tooltipRef.current)
    tooltip.transition().duration(500).style("opacity", "0")
    canvasRef.current.style.cursor = "default"
  }, [])

  const loadWorldData = async (): Promise<CountryFeature[]> => {
    try {
      // Use the local GeoJSON file
      const geoJsonData = worldGeoJson as { features: CountryFeature[] }
      return geoJsonData.features
    } catch (err) {
      console.error("Error loading local world data:", err)
      throw new Error("Failed to load world data")
    }
  }

  useEffect(() => {
    if (!canvasRef.current || !tooltipRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up responsive dimensions
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Get the actual container size for responsive canvas
    const containerRect = canvas.parentElement?.getBoundingClientRect()
    const containerWidth = containerRect?.width || width
    const containerHeight = containerRect?.height || height

    // Set canvas dimensions for high DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = containerWidth * devicePixelRatio
    canvas.height = containerHeight * devicePixelRatio
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    ctx.scale(devicePixelRatio, devicePixelRatio)

    // Update inner dimensions to match actual container size
    const actualInnerWidth = containerWidth - margin.left - margin.right
    const actualInnerHeight = containerHeight - margin.top - margin.bottom

    // Clear canvas
    ctx.clearRect(0, 0, containerWidth, containerHeight)

    // Set up responsive projection with proper centering to avoid country splitting
    const scale = Math.min(actualInnerWidth, actualInnerHeight) / 4.4
    const projection = d3
      .geoMercator()
      .center([0, 0]) // Center on prime meridian to avoid splitting countries
      .scale(scale)
      .translate([
        285 * (actualInnerWidth / innerWidth),
        actualInnerHeight / 1.5,
      ])
      // Clip to viewport to avoid antimeridian wrapping slivers
      .clipExtent([
        [0, 0],
        [actualInnerWidth, actualInnerHeight],
      ])

    loadWorldData()
      .then((features) => {
        console.log("Successfully loaded world data from local GeoJSON file")

        // Generate hexagonal grid
        const hexRadius = Math.min(actualInnerWidth, actualInnerHeight) / 72 // 10% bigger hexagons in the grid
        const hexagons = generateHexagonalGrid(
          actualInnerWidth,
          actualInnerHeight,
          hexRadius,
          projection
        )

        // Map hexagons to countries and data
        const hexagonData: HexagonData[] = hexagons.map((hex) => {
          const result = isPointInCountry(hex.lat, hex.lng, features)
          return {
            ...hex,
            country: result.country,
            value: result.country
              ? countryData[result.country]?.count
              : undefined,
          }
        })

        // Filter out hexagons that are not in any country (optional - remove this filter to show ocean hexagons)
        const landHexagons = hexagonData.filter((hex) => hex.country !== null)

        // Draw hexagons with slight spacing
        const visualHexRadius = hexRadius * 0.7 // Make hexagons 90% of grid size for spacing
        visualHexRadiusRef.current = visualHexRadius
        hexagonDataRef.current = landHexagons

        // Set up clipping to hide antimeridian slivers
        const clipPadding = Math.max(visualHexRadius, 12)
        ctx.save()
        ctx.beginPath()
        ctx.rect(
          clipPadding,
          0,
          Math.max(0, innerWidth - clipPadding * 2),
          innerHeight
        )
        ctx.clip()

        // Draw hexagons on canvas
        landHexagons.forEach((hex) => {
          const color = getCountryColorCanvas(theme, hex.value)
          drawHexagon(ctx, hex.x, hex.y, visualHexRadius, color)
        })

        ctx.restore()

        // Add mouse event listeners
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mouseleave", handleMouseLeave)

        setLoading(false)
      })
      .catch((loadErr) => {
        console.error("Error loading world data:", loadErr)
        setError(
          "Unable to load map data. Please check your internet connection."
        )
        setLoading(false)

        // Fallback: create a simple message if data fails to load
        ctx.fillStyle = "#666"
        ctx.font = "18px Arial"
        ctx.textAlign = "center"
        ctx.fillText(
          "Unable to load map data. Please check your internet connection.",
          innerWidth / 2,
          innerHeight / 2
        )
      })

    // Cleanup function
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [width, height, data, countryData, handleMouseMove, handleMouseLeave])

  return (
    <div
      className={`map-container ${className}`}
      style={{
        width: "100%",
        maxWidth: `${width}px`,
        aspectRatio: `${width}/${height}`,
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />

      <div
        ref={tooltipRef}
        className={cn(
          "z-50 max-w-md overflow-hidden rounded-md bg-gray-700 px-4 py-2.5 text-sm font-medium text-gray-50 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-300 dark:text-gray-800",
          "rounded-2xl border border-gray-300 bg-gray-700 text-gray-50 outline outline-[6px] outline-gray-200",
          "dark:border-white/10 dark:bg-gray-50 dark:outline-gray-100"
        )}
        style={{
          position: "fixed",
          transition: "all 0.3s",
          zIndex: 1000,
          opacity: 0,
        }}
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            color: "#666",
          }}
        >
          <Spinner />
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16px",
            color: "#666",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default WorldMap
