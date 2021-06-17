import {DefaultState} from "./default-state";

export class DragState extends DefaultState{
    startDrag(data) {
        this.currentDiagramItem?.startDrag(data);
    }

    onDrag(data) {
        this.currentDiagramItem?.onDrag(data);
    }

    endDrag(data){
        this.currentDiagramItem?.endDrag(data);
    }
}
