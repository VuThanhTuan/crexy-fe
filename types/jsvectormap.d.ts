declare module 'jsvectormap' {
  interface RegionStyle {
    initial?: {
      fill?: string
      fillOpacity?: number
    }
    hover?: {
      fill?: string
      fillOpacity?: number
    }
  }

  interface MarkerStyle {
    initial?: {
      fill?: string
      stroke?: string
      r?: number
      fillOpacity?: number
      strokeOpacity?: number
    }
    hover?: {
      fill?: string
      stroke?: string
      fillOpacity?: number
      strokeOpacity?: number
    }
  }

  interface JSVectorMapOptions {
    selector?: string
    map?: string
    zoomButtons?: boolean
    regionStyle?: RegionStyle
    regionLabelStyle?: {
      initial?: {
        fontFamily?: string
        fontSize?: string
        fontWeight?: string
        fill?: string
      }
      hover?: {
        fill?: string
        cursor?: string
      }
    }
    labels?: {
      regions?: {
        render?: (code: string) => string
      }
    }
    markerStyle?: MarkerStyle
    markers?: Array<{
      name?: string
      coords?: [number, number]
    }>
  }

  export default class JSVectorMap {
    constructor(options: JSVectorMapOptions)
  }
}
