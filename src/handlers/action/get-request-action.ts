import { FastifyInstance } from 'fastify';
import type { Action, GetRequestAction } from '../../types/action'
import { removeTrailingSlash } from '../../utils/string'

export const getRequestAction = (fastify: FastifyInstance) => async (action: Action & GetRequestAction) => {
  const { nodeId, inputName, inputValue, url } = action
  const res = await fetch(
    `${removeTrailingSlash(url)}?${inputName.trim()}=${inputValue.trim()}`,
  )

  if (res.ok) {
    await fastify.mongo.db
      ?.collection<Action>('actions')
      .updateOne(
        { nodeId },
        { $set: { inputName, inputValue, url } },
        { upsert: true },
      )
  } else {
    throw new Error(
      `Failed to fetch from ${url}?${inputName}=${inputValue}: ${res.status} ${res.statusText}`,
    )
  }
  return { response: await res.json(), nodeId }
}
