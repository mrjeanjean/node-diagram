import {DiagramItemModel} from "./diagram-item-model";

export class NodeModel extends DiagramItemModel{

    canvasModel;

    constructor($diagramItem, canvasModel, positionX = 0, positionY = 0) {
        super($diagramItem, positionX, positionY);
        this.canvasModel = canvasModel;
    }

    onDrag(data){
        this.positionX = data.currentPositionX / this.canvasModel.getZoom() + this.initialX;
        this.positionY = data.currentPositionY / this.canvasModel.getZoom() + this.initialY;
        this.draw();
    }
}
