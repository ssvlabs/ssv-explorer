"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import * as d3 from "d3"

import { type OperatorStatisticItem } from "@/types/api/statistics"
import { cn } from "@/lib/utils"
import { percentageFormatter } from "@/lib/utils/number"
import { getCountryColor } from "@/components/charts/worldmap/colors"
import { getFlagEmojiByCountryName } from "@/components/charts/worldmap/country-flag-emojies"

import worldGeoJson from "./world.json"

interface MapProps {
  data?: OperatorStatisticItem[]
  width?: number
  height?: number
  className?: string
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

const StandardMap: React.FC<MapProps> = ({
  data,
  width = 600,
  height = 350,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return

    const svg = d3.select(svgRef.current)
    const tooltip = d3.select(tooltipRef.current)

    // Clear previous content
    svg.selectAll("*").remove()

    // Set up responsive dimensions
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create responsive SVG
    svg
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", "100%")

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Set up responsive projection
    const scale = Math.min(innerWidth, innerHeight) / 4
    const projection = d3
      .geoMercator()
      .scale(scale)
      .translate([innerWidth / 2.4, innerHeight / 1.4])

    const path = d3.geoPath().projection(projection)

    loadWorldData()
      .then((features) => {
        console.log("Successfully loaded world data from local GeoJSON file")

        // Draw countries (no filtering - show all countries including Antarctica)
        g.selectAll(".country")
          .data(features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr(
            "d",
            (d: CountryFeature) => path(d as d3.GeoPermissibleObjects) || ""
          )
          .attr("fill", (d: CountryFeature) => {
            const countryName =
              d.properties.NAME || d.properties.name || d.properties.NAME_EN
            const value = countryName ? countryData[countryName] : undefined
            return value !== undefined
              ? getCountryColor(value.count)
              : "var(--empty-100)"
          })
          .style("stroke", "var(--gray-50)")
          .style("stroke-width", "1")
          .style("cursor", "pointer")
          .style("transition", "all 0.3s")
          .on("mouseover", function (event: MouseEvent, d: CountryFeature) {
            const countryName =
              d.properties.NAME || d.properties.name || d.properties.NAME_EN
            const value = countryName ? countryData[countryName] : undefined

            d3.select(this).style("opacity", "0.8")

            tooltip.transition().duration(200).style("opacity", "1")
            const displayPercentage = countryName
              ? percentageFormatter.format(value?.percentage || 0)
              : "N/A"

            tooltip
              .html(
                `
                <span class="font-medium">${getFlagEmojiByCountryName(countryName || "Unknown")} ${
                  countryName || "Unknown"
                }</span> 
                <span class="${displayPercentage != "N/A" ? "text-primary-500" : "text-gray-500"}">${displayPercentage}</span>
              `
              )
              .style("left", event.clientX + 10 + "px")
              .style("top", event.clientY - 40 + "px")
          })
          .on("mousemove", function (event: MouseEvent) {
            tooltip
              .style("left", event.clientX + 10 + "px")
              .style("top", event.clientY - 40 + "px")
          })
          .on("mouseout", function () {
            d3.select(this)
              .style("opacity", "1")
              .style("stroke-width", "1")
              .style("filter", "none")

            tooltip.transition().duration(500).style("opacity", "0")
          })

        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading world data:", error)
        setError(
          "Unable to load map data. Please check your internet connection."
        )
        setLoading(false)

        // Fallback: create a simple message if data fails to load
        g.append("text")
          .attr("x", innerWidth / 2)
          .attr("y", innerHeight / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "18px")
          .style("fill", "#666")
          .text(
            "Unable to load map data. Please check your internet connection."
          )
      })
  }, [width, height, data, countryData])

  return (
    <div
      className={`map-container ${className}`}
      style={{
        width: "100%",
        aspectRatio: "16/9",
        position: "relative",
      }}
    >
      <svg ref={svgRef} />
      <div
        ref={tooltipRef}
        className={cn(
          "pointer-events-none z-50 max-w-md overflow-hidden rounded-2xl border border-gray-300 bg-gray-700 px-4 py-2.5 text-sm font-medium text-gray-50 shadow-md outline outline-[6px] outline-gray-200 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "dark:border-white/10 dark:bg-gray-50 dark:text-gray-800 dark:outline-gray-100"
        )}
        style={{
          position: "fixed",
          transition: "all 0.3s",
          transform: "translate(-50%, -50%)",
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
          Loading map data...
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

export default StandardMap
