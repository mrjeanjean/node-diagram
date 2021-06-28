import {DefaultNode} from "./default-node";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";
import {NodeFactory} from "./factory-interface";
import {CanvasEngine} from "../canvas";

export abstract class AbstractNodeFactory implements NodeFactory{
    createNodeHTML($container: HTMLElement, type: string): HTMLElement {
        let $node = new DefaultNode();
        return $node.createNode($container, type);
    }

    buildNodeBody(nodeModel: NodeModel, canvasEngine: CanvasEngine): void {
        nodeModel.setHTMLTitle("Mon Node");
    }

    abstract createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number):NodeModel;
}
