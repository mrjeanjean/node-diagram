import {DiagramItemModel} from "./diagram-item-model";

export class NodeModel extends DiagramItemModel{

    getZoom = null;

    constructor($diagramItem, getZoom, positionX = 0, positionY = 0) {
        super($diagramItem, positionX, positionY);
        this.getZoom = getZoom;
    }

    onDrag(data){
        this.positionX = data.currentPositionX / this.getZoom() + this.initialX;
        this.positionY = data.currentPositionY / this.getZoom() + this.initialY;
        this.draw();
    }
}
