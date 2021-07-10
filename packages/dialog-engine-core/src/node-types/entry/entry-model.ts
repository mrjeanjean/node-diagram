import {ActivatableInterface, CanvasModel, NodeModel} from "canvas-core";

export class EntryModel extends NodeModel implements ActivatableInterface{
    active: boolean = true;
    data:any = {
        entryName: ""
    }

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
    }

    isActive(): boolean {
        return this.active;
    }

    setActive(active: boolean): void {
        this.active = active;
    }
}
