export interface DragStateInterface {
    startDrag: (data?: any) => void;
    onDrag: (data?: any) => void,
    endDrag: (data?: any) => void,
    onHover: (item: any) => void
}
