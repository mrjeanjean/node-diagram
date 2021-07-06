import {CanvasModel} from "../models/canvas-model";
import {GroupNodeModel} from "../models/group-node-model";
import {AbstractNodeFactory} from "./abstract-node-factory";

export class GroupNodeFactory extends AbstractNodeFactory{
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): GroupNodeModel {
        return new GroupNodeModel($node, canvasModel, positionX, positionY);
    }

    getMenuItemName(): string {
        return "Group";
    }
}
