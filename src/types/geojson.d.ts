declare module "*.geojson" {
  const value: {
    type: "FeatureCollection"
    features: Array<{
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
        [key: string]: string | number | boolean | null | undefined
      }
    }>
  }
  export default value
}
