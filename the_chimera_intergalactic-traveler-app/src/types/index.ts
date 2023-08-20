import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export * from './dto-types'
export * from './user-types'
export * from './data-types'
