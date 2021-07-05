import {Point} from "../types";
import {CanvasEngine} from "./../canvas";
import {contextTypes} from "./context-types";
import {NodeFactory} from "../factories/factory-interface";

export class ContextMenu {
    $contextMenu: HTMLElement | null = null;
    onItemSelect: (data: any) => void;
    position: Point;
    itemsFilters: Array<(itemList:Map<string, NodeFactory>) => Map<string, NodeFactory>>;
    context: string;

    constructor(position: Point, data: { onItemSelect: (data: any) => void, context?: string | null }) {
        this.onItemSelect = data.onItemSelect;
        this.context = data.context ?? contextTypes.main;
        this.position = position;
        this.itemsFilters = new Array<() => Map<string, NodeFactory>>();
        this.addItemsFilter(this.filterItemsByContext);
    }

    addItemsFilter(filter: (itemsList: Map<string, NodeFactory>) => Map<string, NodeFactory>): void {
        this.itemsFilters.push(filter);
    }

    filterItemsByContext(itemsList: Map<string, NodeFactory>):Map<string, NodeFactory>{
        const itemsFiltered = new Map<string, NodeFactory>(itemsList);
        itemsFiltered.forEach((nodeFactory:NodeFactory, nodeName:string)=>{

            if(!nodeFactory.displayOnContextMenu(this.context)){
                itemsFiltered.delete(nodeName);
            }
        });

        return itemsFiltered;
    }

    createContextMenuHTML() {
        this.$contextMenu = document.createElement("div");
        this.$contextMenu.classList.add('context-menu');
        this.$contextMenu.style.left = `${this.position.x}px`;
        this.$contextMenu.style.top = `${this.position.y}px`;

        let $contextMenuHeader = document.createElement("div");
        let $contextMenuBody = document.createElement("div");

        let $contextMenuClose = document.createElement("button");
        let $contextMenuCloseIcon = document.createElement("i");

        $contextMenuClose.classList.add("context-menu__button-close");
        $contextMenuCloseIcon.classList.add("fas", "fa-times")

        $contextMenuHeader.classList.add("context-menu__header");
        $contextMenuBody.classList.add("context-menu__body");

        $contextMenuHeader.innerText = "Add node";

        $contextMenuClose.appendChild($contextMenuCloseIcon);
        $contextMenuHeader.appendChild($contextMenuClose);

        this.$contextMenu.appendChild($contextMenuHeader);
        this.$contextMenu.appendChild($contextMenuBody);

        $contextMenuClose.addEventListener("click", ()=>{
            this.remove();
        })

        this.$contextMenu.addEventListener("mousedown", e => {
            e.stopPropagation();
        });
        this.$contextMenu.addEventListener("wheel", e => {
            e.stopPropagation();
        })

        // TODO: move to effects helpers
        setTimeout(() => {
            this.$contextMenu?.classList.add("transition-enter");
        }, 10);

        return this.$contextMenu;
    }

    createItemHTML(itemName:string):HTMLElement{
        const $menuItem = document.createElement("div");
        $menuItem.classList.add("context-menu__item");
        $menuItem.innerText = itemName;

        return $menuItem
    }

    addMenuItemsHTML(nodesItems: Map<string, NodeFactory>, canvasEngine:CanvasEngine) {
        let nodeItemsFiltered = this.filterItemsByContext(nodesItems);


        nodeItemsFiltered.forEach((nodeFactory:NodeFactory, nodeName:string) => {

            const relativePosition = canvasEngine.canvasModel.getRelativePosition(this.position.x, this.position.y);
            const $menuItem = this.createItemHTML(nodeFactory.getMenuItemName());

            $menuItem.addEventListener("click", () => {
                this.onItemSelect({
                    position: relativePosition,
                    nodeName: nodeName
                });
                this.remove();
            });

            this.$contextMenu?.querySelector(".context-menu__body")?.appendChild($menuItem);
        })
    }

    remove() {
        if (this.$contextMenu) {
            this.$contextMenu.remove();
        }
    }
}
