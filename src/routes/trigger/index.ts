import type { FastifyPluginAsync } from 'fastify'

import ActionBody from '../../schemas/trigger_body.json'
import type { Action } from '../../types/action'
import type { TriggerBodySchema } from '../../types/trigger_body'
import { getRequestAction } from '../../handlers/action/get-request-action';

const user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  // Refer https://swagger.io/docs/specification/describing-request-body/
  /**
   * @swagger
   * tags:
   *   name: Trigger
   *   description: Responsible for handling triggers and executing actions
   */

  /**
   * @swagger
   * /user/trigger:
   *   post:
   *     tags: [Triggers, Actions]
   *     requestBody:
   *        description: Array of Actions to execute
   *        content:
   *           application/json:
   *            schema:
   *             type: object
   *             properties:
   *              actions:
   *               type: array
   *               items:
   *                type: object
   *             required:
   *             - actions
   *     responses:
   *       200:
   *         description: actions execution responses
   */
  fastify.post<{
    Body: TriggerBodySchema
  }>(
    '/',
    {
      schema: {
        body: ActionBody,
      },
    },
    async (request, reply) => {
      const actions = request.body.actions as Action[]
      
      const result = await Promise.all(
        actions.map(async (a) => {
          const { type } = a
          switch (type) {
            case 'GET_REQUEST':
              return getRequestAction(fastify)(a)
            case 'CODE_EXECUTION':
              return null
            default:
              return null
          }
        }),
      )
      reply.send({ result })
    },
  )
}

export default user
