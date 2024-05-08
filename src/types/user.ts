import type { Entity } from './entity'

export type NewUser = {
  name: string
  email: string
  picture?: string
}

export type User = NewUser & Entity

export type GoogleUser = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}
