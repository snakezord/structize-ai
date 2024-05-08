/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CoordinateExtent, Position, XYPosition } from '.';

// interface for the user node items
export type Node<T = any, U extends string | undefined = string | undefined> = {
  id: string;
  position: XYPosition;
  data: T;
  type?: U;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  /** @deprecated use `parentId` instead */
  parentNode?: string;
  parentId?: string;
  zIndex?: number;
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;
};

// props that get passed to a custom node
export type NodeDimensionUpdate = {
  id: string;
  nodeElement: HTMLDivElement;
  forceUpdate?: boolean;
};

export type NodeInternals = Map<string, Node>;

export type NodeBounds = XYPosition & {
  width: number | null;
  height: number | null;
};

export type NodeDragItem = {
  id: string;
  position: XYPosition;
  positionAbsolute: XYPosition;
  // distance from the mouse cursor to the node when start dragging
  distance: XYPosition;
  width?: number | null;
  height?: number | null;
  extent?: 'parent' | CoordinateExtent;
  parentNode?: string;
  parentId?: string;
  dragging?: boolean;
  expandParent?: boolean;
};

export type NodeOrigin = [number, number];
