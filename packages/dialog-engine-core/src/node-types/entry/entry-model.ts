import {ActivatableInterface, CanvasModel, NodeModel} from "canvas-core";

export class EntryModel extends NodeModel implements ActivatableInterface{
    data:any = {
        entryName: ""
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
