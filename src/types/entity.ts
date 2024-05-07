import type { ObjectId } from '@fastify/mongodb'

export type Entity = {
  _id: ObjectId
  createdAt?: string
  updatedAt?: string
}
