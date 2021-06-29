import {CanvasModel, NodeModel} from "canvas-core";

export class ActivateModel extends NodeModel {
    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }
}
