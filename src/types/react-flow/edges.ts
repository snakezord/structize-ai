import type { Position } from '.'
import type { Node } from '.'

// interface for the user edge items
type DefaultEdge<T = any> = {
  id: string
  type?: string
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
  animated?: boolean
  hidden?: boolean
  deletable?: boolean
  data?: T
  className?: string
  sourceNode?: Node
  targetNode?: Node
  selected?: boolean
  markerStart?: EdgeMarkerType
  markerEnd?: EdgeMarkerType
  zIndex?: number
  ariaLabel?: string
  interactionWidth?: number
  focusable?: boolean
  updatable?: EdgeUpdatable
}

export type EdgeUpdatable = boolean

export type SmoothStepPathOptions = {
  offset?: number
  borderRadius?: number
}

type SmoothStepEdgeType<T> = DefaultEdge<T> & {
  type: 'smoothstep'
  pathOptions?: SmoothStepPathOptions
}

export type BezierPathOptions = {
  curvature?: number
}

type BezierEdgeType<T> = DefaultEdge<T> & {
  type: 'default'
  pathOptions?: BezierPathOptions
}

export type Edge<T = any> =
  | DefaultEdge<T>
  | SmoothStepEdgeType<T>
  | BezierEdgeType<T>

export type DefaultEdgeOptions = Omit<
  Edge,
  | 'id'
  | 'source'
  | 'target'
  | 'sourceHandle'
  | 'targetHandle'
  | 'sourceNode'
  | 'targetNode'
>

export type WrapEdgeProps<T = any> = Omit<
  Edge<T>,
  'sourceHandle' | 'targetHandle'
> & {
  sourceHandleId?: string | null
  targetHandleId?: string | null
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  elementsSelectable?: boolean
  edgeUpdaterRadius?: number
  rfId?: string
  isFocusable: boolean
  isUpdatable: EdgeUpdatable
  pathOptions?: BezierPathOptions | SmoothStepPathOptions
  disableKeyboardA11y?: boolean
}

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
  SimpleBezier = 'simplebezier',
}

export type ConnectionLineComponentProps = {
  connectionLineType: ConnectionLineType
  fromNode?: Node
  fromX: number
  fromY: number
  toX: number
  toY: number
  fromPosition: Position
  toPosition: Position
}

export type EdgeMarker = {
  type: MarkerType
  color?: string
  width?: number
  height?: number
  markerUnits?: string
  orient?: string
  strokeWidth?: number
}

export type EdgeMarkerType = string | EdgeMarker

export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}
