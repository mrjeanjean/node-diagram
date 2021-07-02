import {EventDispatcher} from "../utils/event-dispatcher";
import {CanvasModel} from "./canvas-model";
import {PortModel} from "./port-model";
import {DraggableInterface} from "../interfaces/draggable-interface";
import {ItemModel} from "./item-model";
import {Point} from "../types";

export class NodeModel extends ItemModel implements DraggableInterface{
    canvasModel: CanvasModel;
    ports: Array<PortModel> = [];
    events: EventDispatcher;
    positionX: number;
    positionY: number;
    initialX: number;
    initialY: number;
    data: any = {};

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number = 0, positionY: number = 0
    ) {
        super($diagramItem);
        this.canvasModel = canvasModel;
        this.events = new EventDispatcher();

        this.positionX = this.initialX = positionX;
        this.positionY = this.initialY = positionY;

        this.draw();
    }

    getPosition():Point{
        return {
            x: this.positionX,
            y: this.positionY
        }
    }

    addPort(portModel: PortModel): void {
        this.ports.push(portModel);
    }

    removeIOPorts(): void{
        this.ports.filter((port:PortModel)=>!port.isActionType()).forEach((portModel: PortModel)=>portModel.remove())
        this.ports = this.ports.filter((port:PortModel)=>port.isActionType());
    }

    setHTMLTitle(title: string): void{
        this.getHTMLTitle().innerText = title;
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

    getHTMLBody(): HTMLElement{
        return this.getHTMLElement().querySelector(".node__body") as HTMLElement;
    }

    getHTMLTitle(): HTMLElement{
        return this.getHTMLElement().querySelector(".node__title") as HTMLElement;
    }

    getData():any{
        return this.data;
    }

    setData(data:any): void{
        this.data = data;
    }
}
