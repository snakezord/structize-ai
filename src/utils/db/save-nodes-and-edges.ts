import type { FastifyInstance } from 'fastify'
import type { ActionNode } from '../../types/action'

import type { Edge } from '../../types/edge'
import type { TriggerNode } from '../../types/trigger'

export const saveNodesAndEdges =
  (fastify: FastifyInstance) =>
  async (nodes: (ActionNode | TriggerNode)[], edges: Edge[]) => {
    Promise.all(
      nodes.map(async (n) =>
        fastify.mongo.db
          ?.collection<ActionNode | TriggerNode>('nodes')
          .updateOne({ nodeId: n.id }, { $set: n }, { upsert: true }),
      ),
    )
    Promise.all(
      edges.map(async (e) =>
        fastify.mongo.db
          ?.collection<Edge>('edges')
          .updateOne({ id: e._id }, { $set: e }, { upsert: true }),
      ),
    )
  }
