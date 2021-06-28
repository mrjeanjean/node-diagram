import {DefaultNode} from "./default-node";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";
import {NodeFactory} from "./factory-interface";
import {CanvasEngine} from "../canvas";
import {NodeControl} from "../node-controls/node-control";

export class DefaultNodeFactory implements NodeFactory{
    createNodeHTML($container: HTMLElement, type: string): HTMLElement {
        let $node = new DefaultNode();
        return $node.createNode($container, type);
    }

    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        return new NodeModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: NodeModel, canvasEngine: CanvasEngine): void {
        nodeModel.setHTMLTitle("Mon Node");
    }
}
