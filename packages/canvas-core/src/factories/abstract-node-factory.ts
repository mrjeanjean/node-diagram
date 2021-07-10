import {DefaultNode} from "./default-node";
import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";
import {NodeFactory} from "./factory-interface";
import {CanvasEngine} from "../canvas";
import {contextTypes} from "..";

export abstract class AbstractNodeFactory implements NodeFactory{
    createNodeHTML($container: HTMLElement, type: string): HTMLElement {
        let node = new DefaultNode($container, type);
        node.setHTMLTitle(this.getMenuItemName());
        return node.getHTMLElement();
    }

    buildNodeBody(nodeModel: NodeModel, canvasEngine: CanvasEngine): void {
        nodeModel.setHTMLTitle("Mon Node");
    }

    displayOnContextMenu(context: string): boolean {
        return context === contextTypes.main;
    }

    abstract getMenuItemName(): string;
    abstract createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number):NodeModel;

    getMenuGroup(): string {
        return "root";
    }

    editMenuItemHTML($menuItem: HTMLElement): HTMLElement {
        return $menuItem;
    }
}
