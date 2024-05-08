import type { ObjectId } from '@fastify/mongodb'

export type Entity = {
  _id: ObjectId
}

export type EntityDetailed = {
  _id: string
  createdAt: string
  updatedAt: string
}
