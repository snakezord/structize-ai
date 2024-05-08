import type { Entity } from './entity'
import type { Node } from './react-flow'

export type TriggerType = 'DEFAULT_TRIGGER'

export type TriggerBase<ResultT> = {
  type: TriggerType
  result?: ResultT
}

export type DefaultTrigger = {
  type: 'DEFAULT_TRIGGER'
}

type TriggerDataNew = DefaultTrigger
export type TriggerData<ResultT = unknown> = DefaultTrigger &
  TriggerBase<ResultT>

export type TriggerNodeNew = Node<TriggerDataNew>
export type TriggerNode<ResultT = unknown> = Node<TriggerData<ResultT>> & Entity
