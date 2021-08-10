export interface CustomDragOverlayProps {
  dragging: boolean;
  count: number;
  mode: CustomDragMode;
}

export type CustomDragMode = 'move' | 'search'