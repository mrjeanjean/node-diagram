import {DragStateInterface} from "./drag-state-interface";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";

export class DragNodeState implements DragStateInterface {
    itemDragged: NodeModel;

    constructor(itemDragged: NodeModel, canvasModel: CanvasModel) {
        this.itemDragged = itemDragged;
    }

    startDrag(): void {
        this.itemDragged.getHTMLElement().classList.add("is-dragging");
    }

    onDrag(data: any): void {
        this.itemDragged.moveTo(data.currentPositionX, data.currentPositionY);
    }

    endDrag(): void {
        this.itemDragged.resetInitialPosition();
        this.itemDragged.getHTMLElement().classList.remove("is-dragging");
    }

    onHover(item: any): void {
    }
}
