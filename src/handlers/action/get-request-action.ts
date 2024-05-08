import type { FastifyInstance } from 'fastify'
import type { ActionNode, GetRequestAction } from '../../types/action'
import { removeTrailingSlash } from '../../utils/string'

export const getRequestAction =
  (_fastify: FastifyInstance) => async (action: ActionNode) => {
    const { id } = action
    const { inputName, inputValue, url } = action.data as GetRequestAction
    const res = await fetch(
      `${removeTrailingSlash(url)}?${inputName.trim()}=${inputValue.trim()}`,
    )
    return { response: await res.json(), nodeId: id }
  }
