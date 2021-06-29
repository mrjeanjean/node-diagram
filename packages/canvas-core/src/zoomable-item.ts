import {clamp} from "./utils/helpers";
import {CanvasModel} from "./models/canvas-model";
import {DraggableItem} from "./draggable-item";
import {DraggableInterface} from "./interfaces/draggable-interface";

export class ZoomableItem {
    zoom: number;
    model: any;

    constructor(model: CanvasModel) {
        this.model = model;
        this.zoom = model.getZoom() ?? 1;

        this.onMouseWheel = this.onMouseWheel.bind(this);
        this.attachEvents();
    }

    onMouseWheel(event: WheelEvent): void {
        this.zoom += (event.deltaY * -1) / 800;
        this.zoom = clamp(this.zoom, 0.1, 4);
        this.model.setZoom(this.zoom);
    }

    attachEvents(): void {
        this.model.getHTMLElement().addEventListener("wheel", this.onMouseWheel);
    }

    getZoom(): number {
        return this.zoom;
    }

    static makeZoomable(model: any) {
        return new ZoomableItem(model);
    }
}
