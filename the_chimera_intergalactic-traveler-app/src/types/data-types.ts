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
  PackageActivity: PackageActivity[]
}

export interface PackageActivity {
  id: string
  package_id: string
  activity_id: string
  activity: Activity
}

export interface Activity {
  id: string
  name: string
  description: string
  location_id: string
}