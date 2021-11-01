export type Spot = GeoJSON.Feature<GeoJSON.Point, SpotProperties>

type SpotProperties = {
  type: SpotType
  severity: SpotSeverity
  comment?: string
  images: string[]
  voting: number
  status: SpotStatus
  validated: boolean
  createdAt: string
  updatedAt: string
}

export enum SpotType {
  COSTRUCTION = 'construction',
  UNEVEN = 'uneven',
  NARROW = 'narrow',
  DANGER = 'danger'
}

export enum SpotSeverity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4
}

export enum SpotStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
