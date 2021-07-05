import {ItemModel} from "../models/item-model";
import {NodeModel} from "../models/node-model";

export class SelectItemState {
    items: Set<ItemModel>;
    shiftKeyIsPressed: boolean = false;

    constructor() {
        this.items = new Set<ItemModel>();
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        document.addEventListener("keyup", this.onKeyPressed);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
    }

    onSelectionChanged(itemModel: ItemModel): void {
        if (this.items.has(itemModel)) {
            if (this.shiftKeyIsPressed) {
                this.items.delete(itemModel);
                itemModel.getHTMLElement().classList.remove("selected");
            }
        } else {
            if (!this.shiftKeyIsPressed) {
                this.unselectAll();
            }
            this.items.add(itemModel);
            itemModel.getHTMLElement().classList.add("selected");
        }
    }

    onKeyPressed(event: KeyboardEvent): void {
        if (event.key === "Backspace" || event.key === "Delete") {
            this.items.forEach((item: ItemModel) => {
                item.remove();
            });

            this.items.clear();
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === "Shift") {
            this.shiftKeyIsPressed = true;
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.key === "Shift") {
            this.shiftKeyIsPressed = false;
        }
    }

    unselectAll() {
        this.items.forEach((item: ItemModel) => {
            item.getHTMLElement().classList.remove("selected");
        });

        this.items.clear();
    }

    getSelectedItems(currentItem: ItemModel): Array<NodeModel> {
        if (this.items.has(currentItem)) {
            let nodeModelList:Array<NodeModel> = Array.from(this.items.values()).filter((itemModel: ItemModel) => itemModel instanceof NodeModel) as Array<NodeModel>;
            return nodeModelList;
        }

        return new Array<NodeModel>();
    }
}
