import {EventDispatcher} from "../utils/event-dispatcher";
import {CanvasModel} from "./canvas-model";
import {PortModel} from "./port-model";
import {DraggableInterface} from "../interfaces/draggable-interface";
import {ItemModel} from "./item-model";

export class NodeModel extends ItemModel implements DraggableInterface{
    canvasModel: CanvasModel;
    ports: Array<PortModel> = [];
    events: EventDispatcher;
    positionX: number;
    positionY: number;
    initialX: number;
    initialY: number;

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number = 0, positionY: number = 0
    ) {
        super($diagramItem);
        this.canvasModel = canvasModel;
        this.events = new EventDispatcher();

        this.positionX = this.initialX = positionX;
        this.positionY = this.initialY = positionY;

        this.draw();
    }

    addPort(portModel: PortModel): void {
        this.ports.push(portModel);
    }

    resetInitialPosition(): void {
        this.initialX = this.positionX;
        this.initialY = this.positionY;
    }

    moveTo(x: number, y: number): void{
        this.positionX = x / this.canvasModel.getZoom() + this.initialX;
        this.positionY = y / this.canvasModel.getZoom() + this.initialY;
        this.update();
    }

    update(): void {
        this.events.fire('node_update', this);
        this.draw();
    }

    draw(): void {
        this.$diagramItem.style.left = `${this.positionX}px`;
        this.$diagramItem.style.top = `${this.positionY}px`;
    }
}
