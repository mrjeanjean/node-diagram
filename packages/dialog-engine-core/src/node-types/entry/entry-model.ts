import {CanvasModel, NodeModel} from "canvas-core";

export class EntryModel extends NodeModel {
    data:any = {
        entryName: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }
}
