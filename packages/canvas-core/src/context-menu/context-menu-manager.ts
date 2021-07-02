import {CanvasEngine} from "canvas-core";
import {ContextMenu} from "./context-menu";

export class ContextMenuManager {
    $canvas: HTMLElement;
    canvasEngine: CanvasEngine;
    currentContextMenu: ContextMenu | null = null;
    nodesItems: Map<string, string>;

    constructor(canvasEngine: CanvasEngine, $canvas: HTMLElement) {
        this.canvasEngine = canvasEngine;
        this.$canvas = $canvas;
        this.nodesItems = new Map<string, string>();

        this.onClickOutside = this.onClickOutside.bind(this);
        document.addEventListener("mousedown", this.onClickOutside);
        document.addEventListener("wheel", this.onClickOutside);
    }

    add(type: string, itemMenuTitle: string): void {
        this.nodesItems.set(type, itemMenuTitle);
    }

    show(contextMenu:ContextMenu): void {
        this.hide();
        this.currentContextMenu = contextMenu;
        const $contextMenu = this.currentContextMenu.createContextMenuHTML();
        this.currentContextMenu.addMenuItemsHTML(this.nodesItems, this.canvasEngine);
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
