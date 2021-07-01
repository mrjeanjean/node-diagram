import {CanvasEngine} from "canvas-core";
import {Point} from "../types";

export class ContextMenu {
    $canvas: HTMLElement;
    canvasEngine: CanvasEngine;
    $contextMenu: HTMLElement | null = null;
    nodesItems: Map<string, string>;

    constructor(canvasEngine: CanvasEngine, $canvas: HTMLElement) {
        this.canvasEngine = canvasEngine;
        this.$canvas = $canvas;
        this.nodesItems = new Map<string, string>();

        this.show = this.show.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        document.addEventListener("mousedown", this.onClickOutside);
    }

    add(type: string, itemMenuTitle: string): void {
        this.nodesItems.set(type, itemMenuTitle);
    }

    show(position:Point, onSelect:Function): void {

        let $contextMenu = document.createElement("div");
        $contextMenu.classList.add('context-menu');
        $contextMenu.style.left = `${position.x}px`;
        $contextMenu.style.top = `${position.y}px`;

        let $contextMenuHeader = document.createElement("div");
        let $contextMenuBody = document.createElement("div");
        $contextMenuHeader.classList.add("context-menu__header");
        $contextMenuBody.classList.add("context-menu__body");

        $contextMenuHeader.innerText = "Add node";
        this.getItemsHTML($contextMenuBody, position, onSelect);

        $contextMenu.appendChild($contextMenuHeader);
        $contextMenu.appendChild($contextMenuBody);
        this.$canvas.appendChild($contextMenu);

        this.$contextMenu = $contextMenu;
        this.$contextMenu.addEventListener("mousedown", e=>{
            e.stopPropagation();
        });
        this.$contextMenu.addEventListener("wheel", e=>{
            e.stopPropagation();
        })

        setTimeout(()=>{
            $contextMenu.classList.add("transition-enter");
        }, 10);
    }

    hide():void{
        if(this.$contextMenu){
            this.$contextMenu.remove();
        }
    }

    onClickOutside(e: Event):void{
        this.hide();
    }

    getItemsHTML($container: HTMLElement, position: Point, onSelect:Function): void {
        this.nodesItems.forEach((itemMenuName:string, nodeName:string) => {
            const $contextMenuItem = document.createElement("div");
            $contextMenuItem.classList.add("context-menu__item");
            $contextMenuItem.innerText = itemMenuName;
            const relativePosition = this.canvasEngine.canvasModel.getRelativePosition(position.x, position.y);
            $contextMenuItem.addEventListener("click", () => {
                onSelect({
                    position: relativePosition,
                    nodeName: nodeName
                });
                this.hide();
            })
            $container.appendChild($contextMenuItem);
        })
    }
}
