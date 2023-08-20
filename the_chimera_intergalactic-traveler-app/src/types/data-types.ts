export type Locations = Location[]

export interface Location {
  id: string
  name: string
  description: string
  x: number
  y: number
  z: number
  image: string
  destinations: string[]
  type: string
  Package: PackageBrief[]
}

export interface PackageBrief {
  id: string
}

export type Packages = Package[]

export interface Package {
  id: string
  name: string
  price: number
  warp_drive: boolean
  duration: number
  accomodation: string
  category: string
  destinations: string[]
  additional: any[]
  location_id: string
  location: Location
}
