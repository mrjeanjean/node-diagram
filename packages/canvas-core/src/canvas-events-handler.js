import {DraggableItem} from "./draggable-item";

export class CanvasEventsHandler{
    canvasModel;

    itemsMousedDown;
    currentSelectedItem;

    constructor(canvasModel) {
        this.canvasModel = canvasModel;
        this.itemsMousedDown = new Set();

        let draggableItem = DraggableItem.makeDraggable(this.canvasModel.getHTMLElement());

        draggableItem.events.add("startDrag", this.onDragStart.bind(this));
        draggableItem.events.add("onDrag", this.onDrag.bind(this));
        draggableItem.events.add("endDrag", this.onDragEnd.bind(this));
    }

    onItemMouseDown($item){
        this.itemsMousedDown.add(this.canvasModel.getModelFromElement($item));
    }

    onDragStart() {
        this.itemsMousedDown.add(this.canvasModel);

        // TODO: change this to handle all children list
        let currentElement = this.itemsMousedDown.values().next().value;
        this.currentSelectedItem = currentElement;
    }

    onDrag(data) {
        this.currentSelectedItem?.onDrag(data);
    }

    onDragEnd(data) {
        this.currentSelectedItem?.endDrag(data);
        this.itemsMousedDown.clear();
        this.currentSelectedItem = null;
    }
}
