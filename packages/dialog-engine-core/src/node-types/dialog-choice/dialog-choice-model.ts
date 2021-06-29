import {CanvasModel, NodeModel} from "canvas-core";

export class DialogChoiceModel extends NodeModel {
    data: any = {
        quote: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }
}
