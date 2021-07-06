import {ActivatableInterface, CanvasModel, NodeModel} from "canvas-core";

export class DialogQuoteModel extends NodeModel implements ActivatableInterface{
    name: string = "";
    data: any = {
        quote: "",
        character: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }

    isActive(): boolean {
        return false;
    }

    setActive(active: boolean): void {
    }
}
