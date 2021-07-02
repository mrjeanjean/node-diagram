import {Point} from "../types";
import {CanvasEngine} from "canvas-core";

export class ContextMenu {
    $contextMenu: HTMLElement | null = null;
    onItemSelect: (data: any) => void;
    position: Point;
    itemsFilters: Array<(itemList:Map<string, string>) => Map<string, string>>;

    constructor(position: Point, data: { onItemSelect: (data: any) => void }) {
        this.onItemSelect = data.onItemSelect;
        this.position = position;
        this.itemsFilters = new Array<() => Map<string, string>>();
    }

    addItemsFilter(filter: (itemsList: Map<string, string>) => Map<string, string>): void {
        this.itemsFilters.push(filter);
    }

    createContextMenuHTML() {
        this.$contextMenu = document.createElement("div");
        this.$contextMenu.classList.add('context-menu');
        this.$contextMenu.style.left = `${this.position.x}px`;
        this.$contextMenu.style.top = `${this.position.y}px`;

        let $contextMenuHeader = document.createElement("div");
        let $contextMenuBody = document.createElement("div");
        $contextMenuHeader.classList.add("context-menu__header");
        $contextMenuBody.classList.add("context-menu__body");

        $contextMenuHeader.innerText = "Add node";

        this.$contextMenu.appendChild($contextMenuHeader);
        this.$contextMenu.appendChild($contextMenuBody);

        this.$contextMenu.addEventListener("mousedown", e => {
            e.stopPropagation();
        });
        this.$contextMenu.addEventListener("wheel", e => {
            e.stopPropagation();
        })

        setTimeout(() => {
            this.$contextMenu?.classList.add("transition-enter");
        }, 10);

        return this.$contextMenu;
    }

    addMenuItemsHTML(nodesItems: Map<string, string>, canvasEngine:CanvasEngine) {
        let nodeItemsFiltered = nodesItems;
        nodeItemsFiltered.forEach((itemMenuName:string, nodeName:string) => {
            const $contextMenuItem = document.createElement("div");
            $contextMenuItem.classList.add("context-menu__item");
            $contextMenuItem.innerText = itemMenuName;
            const relativePosition = canvasEngine.canvasModel.getRelativePosition(this.position.x, this.position.y);
            $contextMenuItem.addEventListener("click", () => {
                this.onItemSelect({
                    position: relativePosition,
                    nodeName: nodeName
                });
                this.remove();
            });

            this.$contextMenu?.querySelector(".context-menu__body")?.appendChild($contextMenuItem);
        })
    }

    remove() {
        if (this.$contextMenu) {
            this.$contextMenu.remove();
        }
    }
}
