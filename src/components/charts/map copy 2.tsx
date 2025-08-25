// "use client"

// import React, { useEffect, useMemo, useRef, useState } from "react"
// import * as d3 from "d3"

// import worldGeoJson from "./world.json"

// interface MapProps {
//   data?: Record<string, number>
//   width?: number
//   height?: number
//   className?: string
// }

// interface HexagonData {
//   x: number
//   y: number
//   country?: string | null
//   value?: number
//   lat: number
//   lng: number
// }

// interface CountryFeature {
//   type: "Feature"
//   geometry: {
//     type:
//       | "Polygon"
//       | "MultiPolygon"
//       | "Point"
//       | "MultiPoint"
//       | "LineString"
//       | "MultiLineString"
//     coordinates: number[][][] | number[][][][]
//   }
//   properties: {
//     NAME?: string
//     name?: string
//     NAME_EN?: string
//     [key: string]: string | number | boolean | null | undefined
//   }
// }

// // Function to generate hexagon path with flat-top orientation (better for honeycomb)
// const generateHexagonPath = (
//   centerX: number,
//   centerY: number,
//   radius: number
// ): string => {
//   const points: [number, number][] = []
//   for (let i = 0; i < 6; i++) {
//     // Start from flat top (add π/2 offset) for proper honeycomb orientation
//     const angle = (Math.PI / 3) * i + Math.PI / 2
//     const x = centerX + radius * Math.cos(angle)
//     const y = centerY + radius * Math.sin(angle)
//     points.push([x, y])
//   }
//   return `M${points.map((p) => p.join(",")).join("L")}Z`
// }

// // Function to generate hexagonal grid
// const generateHexagonalGrid = (
//   width: number,
//   height: number,
//   hexRadius: number,
//   projection: d3.GeoProjection
// ): HexagonData[] => {
//   const hexagons: HexagonData[] = []

//   // Calculate hexagon dimensions for true honeycomb tessellation
//   const hexWidth = hexRadius * 2
//   const hexHeight = hexRadius * Math.sqrt(3)

//   // In a true honeycomb pattern:
//   // - Horizontal spacing between centers: 3/4 of hexagon width (1.5 * radius)
//   // - Vertical spacing between rows: 3/4 of hexagon height
//   const horizontalSpacing = hexRadius * 1.5
//   const verticalSpacing = hexHeight * 0.75

//   // Calculate grid dimensions with padding
//   const cols = Math.ceil(width / horizontalSpacing) + 4
//   const rows = Math.ceil(height / verticalSpacing) + 4

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       // True honeycomb offset: alternate rows are shifted by half the horizontal spacing
//       const isOddRow = row % 2 === 1
//       const xOffset = isOddRow ? horizontalSpacing / 2 : 0

//       const x = col * horizontalSpacing + xOffset - horizontalSpacing
//       const y = row * verticalSpacing - verticalSpacing

//       // Skip if outside the visible area (with some margin)
//       if (
//         x < -hexRadius ||
//         x > width + hexRadius ||
//         y < -hexRadius ||
//         y > height + hexRadius
//       ) {
//         continue
//       }

//       // Convert screen coordinates back to lat/lng
//       const [lng, lat] = projection.invert?.([x, y]) || [0, 0]

//       // Only include hexagons within reasonable world bounds
//       if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
//         hexagons.push({
//           x,
//           y,
//           lat,
//           lng,
//         })
//       }
//     }
//   }

//   return hexagons
// }

// // Function to determine if a point is inside a country
// const isPointInCountry = (
//   lat: number,
//   lng: number,
//   features: CountryFeature[]
// ): { country: string | null; feature: CountryFeature | null } => {
//   const point: [number, number] = [lng, lat]

//   for (const feature of features) {
//     if (feature.geometry.type === "Polygon") {
//       if (d3.geoContains(feature as d3.GeoPermissibleObjects, point)) {
//         const countryName =
//           feature.properties.NAME ||
//           feature.properties.name ||
//           feature.properties.NAME_EN
//         return { country: countryName || null, feature }
//       }
//     } else if (feature.geometry.type === "MultiPolygon") {
//       if (d3.geoContains(feature as d3.GeoPermissibleObjects, point)) {
//         const countryName =
//           feature.properties.NAME ||
//           feature.properties.name ||
//           feature.properties.NAME_EN
//         return { country: countryName || null, feature }
//       }
//     }
//   }

//   return { country: null, feature: null }
// }

// const WorldMap: React.FC<MapProps> = ({
//   data,
//   width = 600,
//   height = 350,
//   className = "",
// }) => {
//   const svgRef = useRef<SVGSVGElement>(null)
//   const tooltipRef = useRef<HTMLDivElement>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Mock data for countries with random values (fallback if no data provided)
//   const mockCountryData = useMemo(
//     () =>
//       data || {
//         USA: 100,
//         China: 5,
//         Japan: 22,
//         Germany: 65,
//         "United Kingdom": 72,
//         France: 68,
//         India: 45,
//         Italy: 58,
//         Brazil: 42,
//         Canada: 75,
//         Russia: 55,
//         "South Korea": 82,
//         Australia: 70,
//         Spain: 61,
//         Mexico: 38,
//         Indonesia: 35,
//         Netherlands: 77,
//         "Saudi Arabia": 48,
//         Switzerland: 88,
//         Taiwan: 79,
//         Belgium: 69,
//         Argentina: 41,
//         Ireland: 74,
//         Israel: 73,
//         Austria: 66,
//         Nigeria: 28,
//         Norway: 81,
//         "South Africa": 33,
//         Egypt: 31,
//         Bangladesh: 22,
//         Thailand: 46,
//         Chile: 52,
//         Finland: 76,
//         Malaysia: 49,
//         Philippines: 36,
//         Vietnam: 39,
//         Denmark: 80,
//         Singapore: 89,
//         "New Zealand": 71,
//         Sweden: 83,
//         Portugal: 59,
//         Greece: 47,
//         "Czech Republic": 63,
//         Romania: 44,
//         Peru: 37,
//         Poland: 56,
//         Ukraine: 29,
//         Morocco: 34,
//         Kenya: 25,
//         "Sri Lanka": 32,
//         Croatia: 62,
//       },
//     [data]
//   )

//   const loadWorldData = async (): Promise<CountryFeature[]> => {
//     try {
//       // Use the local GeoJSON file
//       const geoJsonData = worldGeoJson as { features: CountryFeature[] }
//       return geoJsonData.features
//     } catch (err) {
//       console.error("Error loading local world data:", err)
//       throw new Error("Failed to load world data")
//     }
//   }

//   useEffect(() => {
//     if (!svgRef.current || !tooltipRef.current) return

//     const svg = d3.select(svgRef.current)
//     const tooltip = d3.select(tooltipRef.current)

//     // Clear previous content
//     svg.selectAll("*").remove()

//     // Set up responsive dimensions
//     const margin = { top: 0, right: 0, bottom: 0, left: 0 }
//     const innerWidth = width - margin.left - margin.right
//     const innerHeight = height - margin.top - margin.bottom

//     // Create responsive SVG
//     svg
//       .attr("width", "100%")
//       .attr("height", "100%")
//       .attr("viewBox", `0 0 ${width} ${height}`)
//       .style("width", "100%")
//       .style("height", "100%")

//     const g = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`)

//     // Set up responsive projection
//     const scale = Math.min(innerWidth, innerHeight) / 4
//     const projection = d3
//       .geoMercator()
//       .scale(scale)
//       .translate([innerWidth / 2.4, innerHeight / 1.4])

//     // const path = d3.geoPath().projection(projection) // Not needed for hexagon rendering

//     // Color scale - using CSS variables
//     const colors = [
//       "var(--primary-200)",
//       "var(--primary-300)",
//       "var(--primary-400)",
//       "var(--primary-500)",
//     ]
//     const colorScale = d3.scaleQuantize<string>().domain([0, 100]).range(colors)

//     loadWorldData()
//       .then((features) => {
//         console.log("Successfully loaded world data from local GeoJSON file")

//         // Generate hexagonal grid
//         const hexRadius = Math.min(innerWidth, innerHeight) / 80 // Bigger hexagons for better visibility
//         const hexagons = generateHexagonalGrid(
//           innerWidth,
//           innerHeight,
//           hexRadius,
//           projection
//         )

//         // Map hexagons to countries and data
//         const hexagonData: HexagonData[] = hexagons.map((hex) => {
//           const result = isPointInCountry(hex.lat, hex.lng, features)
//           return {
//             ...hex,
//             country: result.country,
//             value: result.country ? mockCountryData[result.country] : undefined,
//           }
//         })

//         // Filter out hexagons that are not in any country (optional - remove this filter to show ocean hexagons)
//         const landHexagons = hexagonData.filter((hex) => hex.country !== null)

//         // Draw hexagons with slight spacing
//         const visualHexRadius = hexRadius * 0.7 // Make hexagons 90% of grid size for spacing
//         g.selectAll(".hexagon")
//           .data(landHexagons)
//           .enter()
//           .append("path")
//           .attr("class", "hexagon")
//           .attr("d", (d: HexagonData) =>
//             generateHexagonPath(d.x, d.y, visualHexRadius)
//           )
//           .attr("fill", (d: HexagonData) => {
//             return d.value !== undefined
//               ? colorScale(d.value)
//               : "var(--empty-100)"
//           })
//           .style("cursor", "pointer")
//           .style("stroke", "none")
//           .style("transition", "all 0.3s")
//           .on("mouseover", function (event: MouseEvent, d: HexagonData) {
//             d3.select(this).style("opacity", "0.8")

//             tooltip.transition().duration(200).style("opacity", "1")

//             tooltip
//               .html(
//                 `
//                 <strong>${d.country || "Unknown"}</strong><br/>
//                 ${d.value !== undefined ? `Operators: ${d.value}` : "No Operators"}
//               `
//               )
//               .style("left", event.clientX + 10 + "px")
//               .style("top", event.clientY - 28 + "px")
//           })
//           .on("mousemove", function (event: MouseEvent) {
//             tooltip
//               .style("left", event.clientX + 10 + "px")
//               .style("top", event.clientY - 28 + "px")
//           })
//           .on("mouseout", function () {
//             d3.select(this).style("opacity", "1")

//             tooltip.transition().duration(500).style("opacity", "0")
//           })

//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("Error loading world data:", error)
//         setError(
//           "Unable to load map data. Please check your internet connection."
//         )
//         setLoading(false)

//         // Fallback: create a simple message if data fails to load
//         g.append("text")
//           .attr("x", innerWidth / 2)
//           .attr("y", innerHeight / 2)
//           .attr("text-anchor", "middle")
//           .style("font-size", "18px")
//           .style("fill", "#666")
//           .text(
//             "Unable to load map data. Please check your internet connection."
//           )
//       })
//   }, [width, height, data, mockCountryData])

//   return (
//     <div
//       className={`map-container ${className}`}
//       style={{
//         width: "100%",
//         aspectRatio: "16/9",
//         position: "relative",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <svg ref={svgRef} />
//       <div
//         ref={tooltipRef}
//         className="tooltip"
//         style={{
//           position: "fixed",
//           backgroundColor: "rgba(0, 0, 0, 0.8)",
//           color: "white",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           fontSize: "12px",
//           pointerEvents: "none",
//           opacity: 0,
//           transition: "all 0.3s",
//           zIndex: 1000,
//         }}
//       />
//       {loading && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             fontSize: "16px",
//             color: "#666",
//           }}
//         >
//           Loading map data...
//         </div>
//       )}
//       {error && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             fontSize: "16px",
//             color: "#666",
//             textAlign: "center",
//           }}
//         >
//           {error}
//         </div>
//       )}
//     </div>
//   )
// }

// export default WorldMap
