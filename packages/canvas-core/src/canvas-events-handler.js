import {DraggableItem} from "./draggable-item";

export class CanvasEventsHandler{
    canvasModel;

    itemsMousedDown;
    currentSelectedItem;

    constructor(canvasModel) {
        this.canvasModel = canvasModel;
        this.itemsMousedDown = new Set();

        let draggableItem = DraggableItem.makeDraggable(this.canvasModel.getHTMLElement());

        draggableItem.events.add("startDrag", this.startDrag.bind(this));
        draggableItem.events.add("onDrag", this.onDrag.bind(this));
        draggableItem.events.add("endDrag", this.endDrag.bind(this));
    }

    onItemMouseDown($item){
        this.itemsMousedDown.add(this.canvasModel.getModelFromElement($item));
    }

    startDrag() {
        this.itemsMousedDown.add(this.canvasModel);

        // TODO: change this to handle the all children list and choosing the right item
        this.currentSelectedItem = this.itemsMousedDown.values().next().value;
    }

    onDrag(data) {
        this.currentSelectedItem?.onDrag(data);
    }

    endDrag(data) {
        this.currentSelectedItem?.endDrag(data);
        this.itemsMousedDown.clear();
        this.currentSelectedItem = null;
    }
}
