import fp from 'fastify-plugin'

import type { FastifyInstance } from 'fastify'

import type { FastifyMongodbOptions } from '@fastify/mongodb'
import mongodb from '@fastify/mongodb'

export const mongoDbPlugin = async (
  fastify: FastifyInstance,
  opts: FastifyMongodbOptions,
) => {
  console.log(process.env.MONGO_URI)

  await fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGO_URI,
    database: process.env.DB_NAME,
    ...opts,
  })
}

/**
 * This plugins adds mongodb
 *
 * @see https://github.com/fastify/fastify-mongodb
 */
export default fp<FastifyMongodbOptions>(mongoDbPlugin)
