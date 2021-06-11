import {DraggableItem} from "./draggable-item";

export class CanvasEventsHandler{
    canvasModel;
    canvas

    itemsMousedDown;
    currentSelectedItem;

    constructor(canvasModel, canvas) {
        this.canvasModel = canvasModel;
        this.canvas = canvas;
        this.itemsMousedDown = new Set();

        let draggableItem = DraggableItem.makeDraggable(this.canvasModel.getHTMLElement());
        draggableItem.events.add("startDrag", this.onDragStart.bind(this));
        draggableItem.events.add("onDrag", this.onDrag.bind(this));
        draggableItem.events.add("endDrag", this.onDragEnd.bind(this));
    }

    onItemMouseDown($item){
        this.itemsMousedDown.add($item);
    }

    onDragStart() {
        this.itemsMousedDown.add(this.canvas.$nodeLayer);

        // TODO: change this to handle all children list
        let currentElement = this.itemsMousedDown.values().next().value;
        this.currentSelectedItem = this.canvas.getModelFromElement(currentElement);
    }

    onDrag(data) {
        this.currentSelectedItem?.onDrag(data);
    }

    onDragEnd(data) {
        console.log("END FROM DELEGATED", data);
        this.currentSelectedItem?.endDrag(data);
        this.itemsMousedDown.clear();
        this.currentSelectedItem = null;
    }
}
