import fp from 'fastify-plugin'

import type { FastifyJWTOptions } from '@fastify/jwt'
import jwt from '@fastify/jwt'

/**
 * @fastify/jwt enables the use of JWT in a Fastify application.
 *
 * @see https://github.com/fastify/jwt
 */
export default fp<FastifyJWTOptions>(async (fastify, opts) => {
  await fastify.register(jwt, {
    ...opts,
    secret: process.env.JWT_SECRET!,
  })
})
