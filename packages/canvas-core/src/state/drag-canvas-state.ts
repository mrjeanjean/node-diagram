import {DragStateInterface} from "./drag-state-interface";
import {CanvasModel} from "../models/canvas-model";

export class DragCanvasState implements DragStateInterface{
    canvasModel: CanvasModel;

    constructor(canvasModel: CanvasModel) {
        this.canvasModel = canvasModel;
    }

    startDrag(): void {
    }

    onDrag(data: any): void {
        this.canvasModel.getLayers().forEach(layerModel => {
            layerModel.moveTo(data.currentPositionX, data.currentPositionY);
        })
    }

    endDrag(data: any): void {
        this.canvasModel.getLayers().forEach(layerModel => {
            layerModel.resetInitialPosition();
        })
    }

    onHover(item: any): void {
    }

}
