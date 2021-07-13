import {CanvasModel, NodeModel} from "canvas-core";
import {DraggableItem} from "./draggable-item";

export class SortableItem {
    private nodeModel: NodeModel;
    private $node: HTMLElement;
    private canvasModel: CanvasModel;

    constructor(nodeModel: NodeModel, canvasModel: CanvasModel) {
        this.nodeModel = nodeModel;
        this.canvasModel = canvasModel;
        this.$node = nodeModel.getHTMLElement() as HTMLElement;

        let draggableItem = DraggableItem.makeDraggable(nodeModel.getHTMLTitle());
        this.onDrag = this.onDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.startDrag = this.startDrag.bind(this);

        draggableItem.events.add("startDrag", this.startDrag);
        draggableItem.events.add("onDrag", this.onDrag);
        draggableItem.events.add("endDrag", this.endDrag);
    }

    startDrag(data: any): void{
        data.event.stopPropagation();
        this.$node.classList.add("is-sorting");
    }

    onDrag(data: any): void {
        this.nodeModel.moveTo(this.nodeModel.getPosition().x, data.currentPositionY);
    }

    endDrag(data: any): void {
        console.log("", data);
        data.event.stopPropagation();
        this.nodeModel.moveTo(0, 0);
        this.$node.classList.remove("is-sorting");
    }

    static makeSortable(model: any, canvasModel: CanvasModel) {
        return new SortableItem(model, canvasModel);
    }
}
