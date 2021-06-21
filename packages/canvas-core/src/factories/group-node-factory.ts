import {DefaultNodeFactory} from "./default-node-factory";
import {CanvasModel} from "../models/canvas-model";
import {GroupNodeModel} from "../models/group-node-model";

export class GroupNodeFactory extends DefaultNodeFactory{
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): GroupNodeModel {
        return new GroupNodeModel($node, canvasModel, positionX, positionY);
    }
}
