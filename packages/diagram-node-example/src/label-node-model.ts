import {CanvasModel, NodeModel} from "canvas-core";

export class LabelNodeModel extends NodeModel {
    data: any = {
        label: "Mon label",
        title: "Titre"
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
        console.log(this.data);
    }
}
