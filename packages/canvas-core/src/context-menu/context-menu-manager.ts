import {CanvasEngine} from "canvas-core";
import {ContextMenu} from "./context-menu";
import {NodeFactory} from "../factories/factory-interface";

export class ContextMenuManager {
    $canvas: HTMLElement;
    canvasEngine: CanvasEngine;
    currentContextMenu: ContextMenu | null = null;
    nodesItems: Map<string, NodeFactory>;
    groups: Array<{slug:string, name: string}>

    constructor(canvasEngine: CanvasEngine, $canvas: HTMLElement) {
        this.canvasEngine = canvasEngine;
        this.$canvas = $canvas;
        this.nodesItems = new Map<string, NodeFactory>();
        this.groups = new Array<{slug: string; name: string}>()

        this.onClickOutside = this.onClickOutside.bind(this);
        document.addEventListener("mousedown", this.onClickOutside);
        document.addEventListener("wheel", this.onClickOutside);
    }

    addGroup(groupSlug: string, groupName: string):void{
        this.groups.push({
            slug: groupSlug,
            name: groupName,
        })
    }

    add(type: string, nodeFactory: NodeFactory): void {
        this.nodesItems.set(type, nodeFactory);
    }

    show(contextMenu:ContextMenu): void {
        this.hide();
        this.currentContextMenu = contextMenu;
        const $contextMenu = this.currentContextMenu.createContextMenuHTML();

        this.currentContextMenu.addMenuGroupsHTML(this.groups);
        this.currentContextMenu.addMenuItemsHTML(this.nodesItems, this.canvasEngine);
        this.currentContextMenu.shakeItems();

        this.$canvas.appendChild($contextMenu);
    }

    hide():void{
        if(this.currentContextMenu){
            this.currentContextMenu.remove();
        }
    }

    onClickOutside(e: Event):void{
        this.hide();
    }
}
