import {DragStateInterface} from "./drag-state-interface";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";

export class DragSelectedNodeState implements DragStateInterface {
    itemsSelectedDragged: Array<NodeModel>;

    constructor(itemsSelectedDragged: Array<NodeModel>, canvasModel: CanvasModel) {
        this.itemsSelectedDragged = itemsSelectedDragged;
    }

    startDrag(): void {
        this.itemsSelectedDragged.forEach((selectedItem:NodeModel)=>{
            selectedItem.getHTMLElement().classList.add("is-dragging");
        });
    }

    onDrag(data: any): void {
        this.itemsSelectedDragged.forEach((selectedItem:NodeModel)=> {
            selectedItem.moveTo(data.currentPositionX, data.currentPositionY);
        });
    }

    endDrag(): void {
        this.itemsSelectedDragged.forEach((selectedItem:NodeModel)=>{
            selectedItem.resetInitialPosition();
            selectedItem.getHTMLElement().classList.remove("is-dragging");
        });
    }

    onHover(item: any): void {
    }
}
