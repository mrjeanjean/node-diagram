import {DefaultState} from "./default-state";

export class DragState extends DefaultState{
    onDrag(data) {
        this.currentDiagramItem?.onDrag(data);
    }

    endDrag(data){
        this.currentDiagramItem?.endDrag(data);
    }
}
