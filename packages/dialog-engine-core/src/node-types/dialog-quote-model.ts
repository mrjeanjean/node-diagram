import {CanvasModel, NodeModel} from "canvas-core";

export class DialogQuoteModel extends NodeModel {
    data: any = {
        quote: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }
}
