import {CanvasModel, NodeModel} from "canvas-core";

export class RenameModel extends NodeModel {
    data: any = {
        name: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }
}
