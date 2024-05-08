import type { FastifyPluginAsync } from 'fastify'
import { queryNodesAndEdges } from '../../utils/db/query-nodes-edges'

const nodesEdges: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  // Refer https://swagger.io/docs/specification/describing-request-body/
  /**
   * @swagger
   * tags:
   *   name: NodesEdges
   *   description: Responsible for querying nodes and edges
   */

  /**
   * @swagger
   * /nodes-edges:
   *   get:
   *     tags: [Nodes, Edges]
   *     description: Returns nodes and edges
   *     responses:
   *       200:
   *         description: nodes and edges as Object {nodes, edges}
   */
  fastify.get('/', async (_request, reply) => {
    // Query nodes & edges
    const result = await queryNodesAndEdges(fastify)
    reply.send(result)
  })
}

export default nodesEdges
