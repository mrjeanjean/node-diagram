import {DraggableItem} from "./node-transform/draggable-item";
import {PortModel} from "./models/port-model";
import {NodeModel} from "./models/node-model";
import {LinkModel} from "./models/link-model";
import {CanvasModel} from "./models/canvas-model";
import {DragConnexionState} from "./state/drag-connexion-state";
import {DragCanvasState} from "./state/drag-canvas-state";
import {DragStateInterface} from "./state/drag-state-interface";
import {DragNodeState} from "./state/drag-node-state";
import {ItemModel} from "./models/item-model";
import {SelectItemState} from "./state/select-item-state";
import {SelectableItem} from "./node-transform/selectable-item";
import {DragSelectedNodeState} from "./state/drag-selected-node-state";

export class CanvasEventsHandler {
    canvasModel: CanvasModel;
    itemsMousedDown: Set<any> = new Set();
    itemsMousedOver: Set<any> = new Set();
    currentState: DragStateInterface | null = null;
    selectItemState: SelectItemState;

    constructor(canvasModel: CanvasModel) {
        this.canvasModel = canvasModel;

        let draggableCanvas = DraggableItem.makeDraggable(this.canvasModel.getHTMLElement());

        draggableCanvas.events.add("startDrag", this.startDrag.bind(this));
        draggableCanvas.events.add("onDrag", this.onDrag.bind(this));
        draggableCanvas.events.add("endDrag", this.endDrag.bind(this));

        this.canvasModel.getHTMLElement().addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvasModel.getHTMLElement().addEventListener("click", this.onClick.bind(this));

        this.selectItemState = new SelectItemState();
    }

    addItem(itemModel: any): void {
        if (itemModel instanceof NodeModel) {
            itemModel.getHTMLElement().addEventListener("mousedown", () => {
                this.onItemMouseDown(itemModel);
            });

            SelectableItem.makeSelectable(itemModel.getHTMLElement(), () => {
                this.selectItem(itemModel);
            });
        }

        if (itemModel instanceof PortModel) {
            itemModel.getHTMLElement().addEventListener("mouseenter", () => {
                this.onItemMouseOver(itemModel);
            });

            itemModel.getHTMLElement().addEventListener("mouseout", () => {
                this.removeItemMouseOver(itemModel);
            });

            itemModel.getHTMLElement().addEventListener("mousedown", () => {
                this.onItemMouseDown(itemModel);
            });
        }

        if (itemModel instanceof LinkModel) {
            new SelectableItem(itemModel.getHTMLElement(), () => {
                this.selectItem(itemModel);
            });
        }
    }

    addSelectableItem(itemModel: any, $targetHTML:HTMLElement | null = null): void{
        $targetHTML = $targetHTML ?? itemModel.getHTMLElement() as HTMLElement;
        SelectableItem.makeSelectable($targetHTML, () => {
            this.selectItem(itemModel);
        });
    }

    onItemMouseDown(itemModel: any): void {
        this.itemsMousedDown.add(itemModel);
    }

    onItemMouseOver(itemModel: any): void {
        this.itemsMousedOver.add(itemModel);
    }

    removeItemMouseOver(itemModel: any): void {
        this.itemsMousedOver.delete(itemModel);
    }

    startDrag(data: any): void {
        this.itemsMousedDown.add(this.canvasModel);

        // TODO: change this to handle all children list
        let currentSelectedItemModel = this.itemsMousedDown.values().next().value;

        if (currentSelectedItemModel instanceof PortModel) {
            this.currentState = new DragConnexionState(currentSelectedItemModel as PortModel, this.canvasModel);
        } else if (currentSelectedItemModel instanceof CanvasModel) {
            this.currentState = new DragCanvasState(this.canvasModel);
        } else if (currentSelectedItemModel instanceof NodeModel) {
            let selectedItems = this.selectItemState.getSelectedItems(currentSelectedItemModel);

            if(selectedItems.length <= 0){
                this.currentState = new DragNodeState(currentSelectedItemModel as NodeModel, this.canvasModel);
            }else{
                this.currentState = new DragSelectedNodeState(selectedItems, this.canvasModel);
            }
        }

        this.currentState?.startDrag(data);
    }

    onDrag(data: any): void {
        this.currentState?.onDrag(data);
    }

    endDrag(data: any): void {
        this.currentState?.endDrag(data);
        this.itemsMousedDown.clear();
        this.currentState = null;
    }

    onMouseMove(): void {
        let currentHoveredItem = this.itemsMousedOver.values().next().value;
        this.currentState?.onHover(currentHoveredItem);
    }

    onClick(): void {
        this.selectItemState.unselectAll();
    }

    selectItem(itemModel: ItemModel): void {
        this.selectItemState.onSelectionChanged(itemModel);
        //this.canvasModel.getCanvasEngine().removeLink(itemModel as LinkModel);
    }
}
