import type { FastifyPluginAsync } from 'fastify'
import type { User } from '../../types/user'
import { validateGoogleTokenAndGetUserData } from '../../utils/auth'

const auth: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  /**
   * @swagger
   * /auth/google/callback:
   *   get:
   *     tags: [Auth]
   *     requestBody:
   *        description: Google login callback
   *     responses:
   *       200:
   *         description: google callback success with token
   */
  fastify.get('/google/callback', async (request, reply) => {
    try {
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request,
        )
      const userData = await validateGoogleTokenAndGetUserData(
        token.token.access_token,
      )

      // If no user data
      if (!userData) throw new Error('Failed to fetch user info from Google')

      const db = fastify.mongo.db // Assume a MongoDB client instance is set in Fastify decorators
      const collection = db?.collection('users')

      // try to find user
      const existingUser = await collection?.findOne<User>({
        email: userData.email,
      })
      // If user exist return it
      if (existingUser) {
        const accessToken = fastify.jwt.sign(
          { userId: existingUser._id.toString() },
          { expiresIn: '1h' },
        )
        const refreshToken = fastify.jwt.sign(
          { userId: existingUser._id.toString() },
          { expiresIn: '7d' },
        )
        return await reply
          .code(200)
          .send({ accessToken, refreshToken, user: existingUser })
      }

      // If not, save it
      const newUser = await collection?.insertOne(userData)
      const user = await collection?.findOne<User>({ _id: newUser?.insertedId })

      const accessToken = fastify.jwt.sign(
        { userId: user?._id.toString() },
        { expiresIn: '1h' },
      )
      const refreshToken = fastify.jwt.sign(
        { userId: user?._id.toString() },
        { expiresIn: '7d' },
      )

      return await reply.code(200).send({ accessToken, refreshToken, user })
    } catch (error) {
      fastify.log.error(error) // Consider more sophisticated error logging for production
      return reply.code(500).send({
        error: 'An error occurred during the authentication process.',
        details: error,
      })
    }
  })
}

export default auth
