import type { Entity } from './entity'

export type ActionType = 'GET_REQUEST' | 'CODE_EXECUTION'

type ActionBase = {
  type: ActionType
  nodeId: string
  isValid?: boolean
} & Entity

export type GetRequestAction = {
  type: 'GET_REQUEST'
  url: string
  inputName: string
  inputValue: string
}

export type CodeExecutionAction = {
  type: 'CODE_EXECUTION'
  code: string
}

export type ActionNew = GetRequestAction | CodeExecutionAction

export type Action = ActionBase & (GetRequestAction | CodeExecutionAction)
