import {Point} from "../types";
import {CanvasEngine} from "./../canvas";
import {contextTypes} from "./context-types";
import {NodeFactory} from "../factories/factory-interface";
import {itemTransitionHelper} from "../utils/helpers";
import {EventDispatcher} from "../utils/event-dispatcher";

type ContextMenuFilter = {
    (itemsList: Map<string, NodeFactory>, context: string):Map<string, NodeFactory>
}

export class ContextMenu {
    $contextMenu: HTMLElement | null = null;
    position: Point;
    itemsFilters: Array<ContextMenuFilter>;
    itemsGroups: Map<string, HTMLElement>;
    context: string;
    events: EventDispatcher;

    constructor(position: Point, context?: string | null) {
        this.context = context ?? contextTypes.main;
        this.position = position;
        this.itemsFilters = new Array<() => Map<string, NodeFactory>>();
        this.itemsGroups = new Map<string, HTMLElement>();
        this.events = new EventDispatcher();

        this.addItemsFilter(this.filterItemsByContext);
        this.filterItemsByContext = this.filterItemsByContext.bind(this);
    }

    addMenuGroupsHTML(groups: Array<{slug:string, name:string}>){
        groups.forEach((group)=>{
            let $group = this.itemsGroups.get(group.slug);

            if($group){
                return;
            }

            $group = document.createElement("div");
            $group.classList.add("context-menu__group");
            $group.classList.add(`context-menu__group--${group.slug}`);

            const $groupTitle = document.createElement("div");
            $groupTitle.classList.add("context-menu__group__title");
            $groupTitle.classList.add("context-menu__item");
            $groupTitle.innerText = group.name;

            $groupTitle.addEventListener("click", ()=>{
                this.itemsGroups.forEach($group=>{
                    $group.classList.remove("active");
                });

                $group?.classList.add("active");
            })

            const $groupList = document.createElement("div");
            $groupList.classList.add("context-menu__group__list");

            const $groupButtonBack = document.createElement("div");
            const $groupButtonBackSpan = document.createElement("span");
            $groupButtonBack.classList.add("context-menu__group__button-back");
            $groupButtonBack.appendChild($groupButtonBackSpan),
            $groupButtonBackSpan.innerText = "‹";

            $groupButtonBack.addEventListener("click", this.closeAllGroups.bind(this));

            $group.appendChild($groupTitle);
            $group.appendChild($groupList);
            $groupList.appendChild($groupButtonBack);
            this.$contextMenu?.querySelector(".context-menu__body")?.appendChild($group);

            this.itemsGroups.set(group.slug, $group);
        })
    }

    closeAllGroups(){
        this.itemsGroups.forEach($group=>{
            $group.classList.remove("active");
        })
    }

    addItemsFilter(filter: ContextMenuFilter): void {
        this.itemsFilters.push(filter);
    }

    filterItemsByContext(itemsList: Map<string, NodeFactory>, context: string):Map<string, NodeFactory>{
        const itemsFiltered = new Map<string, NodeFactory>(itemsList);
        itemsFiltered.forEach((nodeFactory:NodeFactory, nodeName:string)=>{

            if(!nodeFactory.displayOnContextMenu(context)){
                itemsFiltered.delete(nodeName);
            }
        });

        return itemsFiltered;
    }

    createContextMenuHTML() {
        this.$contextMenu = document.createElement("div") as HTMLElement;
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

        itemTransitionHelper(this.$contextMenu, "enter");

        return this.$contextMenu;
    }

    createItemHTML(itemName:string):HTMLElement{
        const $menuItem = document.createElement("div");
        $menuItem.classList.add("context-menu__item");
        $menuItem.innerText = itemName;

        return $menuItem;
    }

    addMenuItemsHTML(nodesItems: Map<string, NodeFactory>, canvasEngine:CanvasEngine) {
        let nodeItemsFiltered = this.itemsFilters.reduce((itemsList: Map<string, NodeFactory>, filter:ContextMenuFilter)=>{
            return filter(itemsList, this.context);
        }, nodesItems);

        let $contextMenuBody = this.$contextMenu?.querySelector(".context-menu__body") as HTMLElement;

        if(!$contextMenuBody){
            throw new Error(`Context menu should be created before adding menu items.`);
        }

        nodeItemsFiltered.forEach((nodeFactory:NodeFactory, nodeName:string) => {
            const relativePosition = canvasEngine.canvasModel.getRelativePosition(this.position.x, this.position.y);
            let $menuItem = this.createItemHTML(nodeFactory.getMenuItemName());
            const $groupItem = this.itemsGroups.get(nodeFactory.getMenuGroup());

            $menuItem.addEventListener("click", () => {
                this.events.fire("node-select", {
                    position: relativePosition,
                    nodeName: nodeName
                })
                this.remove();
            });

            $menuItem = nodeFactory.editMenuItemHTML($menuItem);

            if($groupItem){
                $groupItem?.querySelector(".context-menu__group__list")?.appendChild($menuItem);
            }else{
                this.$contextMenu?.querySelector(".context-menu__body")?.appendChild($menuItem);
            }
        })
    }

    shakeItems() {
        const $contextMenuBody = this.$contextMenu?.querySelector(".context-menu__body");
        this.itemsGroups.forEach($group=>{
            let subItemsList = $group.querySelectorAll(".context-menu__group__list .context-menu__item");
            if(subItemsList.length <= 0){
                $group.remove();
            }
        });

        const cleanedItemList = $contextMenuBody?.querySelectorAll(".context-menu__group");
        if(cleanedItemList && cleanedItemList.length <= 1){
            cleanedItemList[0].querySelectorAll(".context-menu__group__list .context-menu__item").forEach($item=>{
                $contextMenuBody?.appendChild($item);
            });
            cleanedItemList[0].remove();
        }

    }

    remove() {
        if (this.$contextMenu) {
            this.$contextMenu.remove();
        }
    }
}
