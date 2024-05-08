import type { FastifyInstance } from 'fastify'
import type { ActionNode } from '../../types/action'

import type { Edge } from '../../types/edge'
import type { TriggerNode } from '../../types/trigger'

export const queryNodesAndEdges = async (fastify: FastifyInstance) => {
  const [nodes, edges] = await Promise.all([
    fastify.mongo.db
      ?.collection<ActionNode | TriggerNode>('nodes')
      .find()
      .toArray(),
    fastify.mongo.db?.collection<Edge>('edges').find().toArray(),
  ])

  return { nodes: nodes ?? [], edges: edges ?? [] }
}
