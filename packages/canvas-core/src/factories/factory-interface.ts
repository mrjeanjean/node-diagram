import {CanvasModel} from "../models/canvas-model";
import {NodeModel} from "../models/node-model";
import {LinkModel} from "../models/link-model";
import {PortModel} from "../models/port-model";
import {CanvasEngine} from "canvas-core";

export interface NodeFactory {
    createNodeHTML: ($container: HTMLElement, type: string) => HTMLElement,
    createNodeModel: ($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) => NodeModel,
    buildNodeBody: (nodeModel: NodeModel, canvasEngine: CanvasEngine) => void,
    displayOnContextMenu: (context: string) => boolean,
    getMenuItemName: () => string,
    getMenuGroup: () => string,
    editMenuItemHTML: ($menuItem: HTMLElement) => HTMLElement
}

export interface LinkFactory {
    createLinkHTML: ($container: SVGElement) => SVGElement,
    createLinkModel: ($link: SVGElement, startPortModel: PortModel, endPortModel: PortModel) => LinkModel
}
