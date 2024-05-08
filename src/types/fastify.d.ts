import type { FastifyReply, FastifyRequest } from 'fastify'

import type { OAuth2Namespace } from '@fastify/oauth2'
import type { User } from './user'

declare module 'fastify' {
  interface FastifyInstance {
    // new types for fastify instance go here
    googleOAuth2: OAuth2Namespace
  }
  interface FastifyRequest {
    // new types for request go here
    user: User
  }
}

type FastifyResponseAuth = (
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<void>
