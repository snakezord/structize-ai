import type { Entity } from './entity'

export type Edge = {
  sessionId: string
  source: string
  target: string
} & Entity
