import type { Entity } from './entity'
import type { Node } from './react-flow'

export type ActionType = 'GET_REQUEST' | 'CODE_EXECUTION'

type ActionBase = {
  type: ActionType
  isValid?: boolean
}

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

type ActionDataNew = GetRequestAction | CodeExecutionAction
export type ActionData = ActionDataNew & ActionBase

export type ActionNodeNew = Node<ActionDataNew>
export type ActionNode = Node<ActionData> & Entity
