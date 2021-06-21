import {DefaultNode} from "./default-node";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";

export class DefaultNodeFactory {
    createNodeHTML($container: HTMLElement, type: string): HTMLElement {
        let $node = new DefaultNode();
        return $node.createNode($container, type);
    }

    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        return new NodeModel($node, canvasModel, positionX, positionY);
    }
}
