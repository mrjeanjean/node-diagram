import {DraggableItem} from "./draggable-item";
import {PortModel} from "./models/port-model";
import {DragState} from "./state/drag-state";
import {ConnectState} from "./state/connect-state";
import {NodeModel} from "./models/node-model";
import {LinkModel} from "./models/link-model";

export class CanvasEventsHandler {
    canvasModel;
    itemsMousedDown = new Set();
    itemsMousedOver = new Set();
    currentState;

    constructor(canvasModel) {
        this.canvasModel = canvasModel;

        let draggableItem = DraggableItem.makeDraggable(this.canvasModel.getHTMLElement());

        draggableItem.events.add("startDrag", this.startDrag.bind(this));
        draggableItem.events.add("onDrag", this.onDrag.bind(this));
        draggableItem.events.add("endDrag", this.endDrag.bind(this));

        this.canvasModel.getHTMLElement().addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    addItem(itemModel) {
        if (itemModel instanceof PortModel) {
            itemModel.getHTMLElement().addEventListener("mouseenter", () => {
                this.onItemMouseOver(itemModel);
            });

            itemModel.getHTMLElement().addEventListener("mouseout", () => {
                this.removeItemMouseOver(itemModel);
            });

            itemModel.getHTMLElement().addEventListener("mousedown", () => {
                this.onItemMouseDown(itemModel);
            });
        }

        if(itemModel instanceof NodeModel){
            itemModel.getHTMLElement().addEventListener("mousedown", () => {
                this.onItemMouseDown(itemModel);
            });
        }

        if(itemModel instanceof LinkModel){
            itemModel.getHTMLElement().addEventListener("click", () => {
                this.selectItem(itemModel);
            });
        }
    }

    removeItem(){
        // TODO: do something, like removing events
    }

    onItemMouseDown(itemModel) {
        this.itemsMousedDown.add(itemModel);
    }

    onItemMouseOver(itemModel) {
        this.itemsMousedOver.add(itemModel);
    }

    removeItemMouseOver(itemModel) {
        this.itemsMousedOver.delete(itemModel);
    }

    startDrag() {
        this.itemsMousedDown.add(this.canvasModel);

        // TODO: change this to handle all children list
        let currentSelectedItem = this.itemsMousedDown.values().next().value;

        if (currentSelectedItem instanceof PortModel) {
            this.currentState = new ConnectState(currentSelectedItem, this.canvasModel);
        } else {
            this.currentState = new DragState(currentSelectedItem, this.canvasModel);
        }

        this.currentState.startDrag();
    }

    onDrag(data) {
        this.currentState?.onDrag(data);

    }

    endDrag(data) {
        this.currentState?.endDrag(data);
        this.itemsMousedDown.clear();
        this.currentState = null;
    }

    onMouseMove() {
        let currentHoveredItem = this.itemsMousedOver.values().next().value;

        this.currentState?.onHover(currentHoveredItem);
    }

    selectItem(itemModel) {
        this.canvasModel.getCanvasEngine().removeLink(itemModel);
    }
}
