import type { FastifyPluginAsync } from 'fastify'

import { getRequestAction } from '../../handlers/action/get-request-action'
import ActionBody from '../../schemas/trigger_body.json'
import type { ActionNode } from '../../types/action'
import type { Edge } from '../../types/edge'
import type { TriggerNode } from '../../types/trigger'
import type { TriggerBodySchema } from '../../types/trigger_body'
import { saveNodesAndEdges } from '../../utils/db/save-nodes-and-edges'

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
   *              nodes:
   *               type: array
   *               items:
   *                type: object
   *              edges:
   *               type: array
   *               items:
   *                type: object
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
      const nodes = request.body.nodes as (ActionNode | TriggerNode)[]
      const edges = request.body.edges as Edge[]

      // Save nodes & edges
      saveNodesAndEdges(fastify)(nodes, edges)

      const executableActions = request.body.actions as ActionNode[]

      const result = await Promise.all(
        executableActions.map(async (a) => {
          const { type } = a.data
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
