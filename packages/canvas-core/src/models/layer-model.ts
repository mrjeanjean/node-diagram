import {ItemModel} from "./item-model";
import {DraggableInterface} from "../interfaces/draggable-interface";

export class LayerModel extends ItemModel implements DraggableInterface{
    positionX: number;
    positionY: number;
    initialX: number;
    initialY: number;

    constructor($diagramItem: HTMLElement | SVGElement, positionX = 0, positionY = 0) {
        super($diagramItem);

        this.positionX = this.initialX = positionX;
        this.positionY = this.initialY = positionY;

        this.draw();
    }

    moveTo(x: number, y: number): void{
        this.positionX = x + this.initialX;
        this.positionY = y + this.initialY;
        this.draw();
    }

    resetInitialPosition(){
        this.initialX = this.positionX;
        this.initialY = this.positionY;
    }

    draw(): void {
        this.$diagramItem.style.left = `${this.positionX}px`;
        this.$diagramItem.style.top = `${this.positionY}px`;
    }

    getPosition(){
        return {
            x: this.positionX,
            y: this.positionY,
        }
    }
}
