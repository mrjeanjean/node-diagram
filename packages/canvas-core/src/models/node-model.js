import {DiagramItemModel} from "./diagram-item-model";
import {EventDispatcher} from "../event-dispatcher";

export class NodeModel extends DiagramItemModel{
    canvasModel;
    ports = [];
    events;

    constructor($diagramItem, canvasModel, positionX = 0, positionY = 0) {
        super($diagramItem, positionX, positionY);
        this.canvasModel = canvasModel;
        this.events = new EventDispatcher()
    }

    onDrag(data){
        this.positionX = data.currentPositionX / this.canvasModel.getZoom() + this.initialX;
        this.positionY = data.currentPositionY / this.canvasModel.getZoom() + this.initialY;
        this.events.fire('node_update', this);
        this.draw();
    }

    addPort(portModel){
        this.ports.push(portModel);
    }
}
