import {CanvasModel, GroupNodeModel, NodeModel} from "canvas-core";
import {DraggableItem} from "./draggable-item";
import {rectIntersectPointY, swapHTMLElements} from "../utils/helpers";

export class SortableItem {
    private nodeModel: NodeModel;
    private $node: HTMLElement;
    private canvasModel: CanvasModel;
    private parentGroupModel: GroupNodeModel;
    private $placeholder: HTMLElement | null = null;
    private offsetTop: number = 0;

    constructor(nodeModel: NodeModel, canvasModel: CanvasModel, parentGroupModel: GroupNodeModel) {
        this.nodeModel = nodeModel;
        this.parentGroupModel = parentGroupModel;
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

    startDrag(data: any): void {
        data.event.stopPropagation();
        this.$node.classList.add("is-sorting");
        this.offsetTop = this.$node.offsetTop;
        this.$node.style.position = "absolute";
        this.$placeholder = this.createPlaceholder();
        this.$node.after(this.$placeholder);
        this.moveElement();
        this.nodeModel.update();
    }

    onDrag(data: any): void {
        this.moveElement(data.currentPositionY);
        this.parentGroupModel.nodes.forEach((siblingModel: NodeModel) => {
            if (siblingModel !== this.nodeModel) {
                const nodeModelTop = this.canvasModel.getRelativeValue((siblingModel.getHTMLElement() as HTMLElement).offsetTop);
                const nodeModelSize = this.canvasModel.getNodeSize(siblingModel);

                if (rectIntersectPointY({
                    top: nodeModelTop,
                    bottom: nodeModelTop + nodeModelSize.height
                }, {
                    x: 0,
                    y: data.currentPositionY + this.canvasModel.getRelativeValue(this.offsetTop)
                })) {
                    swapHTMLElements(siblingModel.getHTMLElement() as HTMLElement, this.$placeholder);
                    swapHTMLElements(this.$node, this.$placeholder);
                    this.parentGroupModel.swapNodes(siblingModel, this.nodeModel);
                }
            }
        })
    }

    moveElement(positionY: number = 0): void {
        positionY = positionY + this.canvasModel.getRelativeValue(this.offsetTop);
        const marginTop = this.canvasModel.getRelativeValue(10);
        positionY = (positionY <= marginTop) ? marginTop : positionY;
        const maxHeight =
            this.parentGroupModel.getHTMLBody().getBoundingClientRect().height -
            this.$node.getBoundingClientRect().height;
        positionY = (positionY >= maxHeight) ? maxHeight : positionY;
        this.nodeModel.moveTo(this.nodeModel.getPosition().x, positionY);
    }

    createPlaceholder(): HTMLElement {
        const $placeholder = document.createElement("div");
        $placeholder.classList.add("node-sortable__placeholder");
        this.parentGroupModel.getHTMLBody().appendChild($placeholder);

        const clientRect = this.canvasModel.getNodeRelativeSize(this.nodeModel);
        $placeholder.style.height = clientRect.height + "px";

        return $placeholder;
    }

    endDrag(data: any): void {
        data.event.stopPropagation();
        this.nodeModel.moveTo(0, 0);
        this.$node.classList.remove("is-sorting");
        this.$node.style.position = '';
        this.$placeholder?.remove();
        this.nodeModel.update();
    }

    static makeSortable(model: any, canvasModel: CanvasModel, parentGroupModel: GroupNodeModel) {
        return new SortableItem(model, canvasModel, parentGroupModel);
    }
}
