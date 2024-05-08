import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

import oauth2, { type FastifyOAuth2Options } from '@fastify/oauth2'

export const oauth2Plugin = async (
  fastify: FastifyInstance,
  _opts: FastifyOAuth2Options,
) => {
  // Google
  await fastify.register(oauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID ?? '',
        secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      },
      auth: oauth2.GOOGLE_CONFIGURATION,
    },
    callbackUri: `${process.env.SERVER_URL}/auth/google/callback`,
    startRedirectPath: '/auth/google',
    callbackUriParams: {
      access_type: 'offline',
    },
    pkce: 'S256',
  } satisfies FastifyOAuth2Options)
}

/**
 * This plugins adds oauth2
 *
 * @see https://github.com/fastify/oauth2
 */
export default fp<FastifyOAuth2Options>(oauth2Plugin)
