import {NodeModel} from "./node-model";
import {CanvasModel} from "./canvas-model";
import {SortableItem} from "../node-transform/sortable-item";

export class GroupNodeModel extends NodeModel {
    nodes: Array<NodeModel> = [];

    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number = 0, positionY: number = 0
    ){
        super($diagramItem, canvasModel, positionX, positionY);
        $diagramItem.classList.add("node--group-node");
    }

    addNode(type = "default") {
        let nodeModel = this.canvasModel.getCanvasEngine().addNode(0,
            0,
            type,
            this.getHTMLBody() as HTMLElement,
            false
        );
        this.nodes.push(nodeModel);

        this.update();

        SortableItem.makeSortable(nodeModel, this.canvasModel, this);
        return nodeModel;
    }

    update(): void {
        super.update();
        this.updateAllNodes();
    }

    updateAllNodes(): void {
        this.nodes.forEach(node => {
            node.update();
        });
    }

    remove() {
        this.nodes.forEach(node => {
            node.remove();
        })
        super.remove();
    }

    swapNodes(nodeModel1: NodeModel, nodeModel2: NodeModel) {
        nodeModel1.update();
        nodeModel2.update();
        const nodeModel1Index = this.nodes.indexOf(nodeModel1);
        const nodeModel2Index = this.nodes.indexOf(nodeModel2);

        // Sorcery: used for swap 2 array elements
        this.nodes.splice(
            nodeModel1Index,
            1,
            this.nodes.splice(
                nodeModel2Index,
                1,
                this.nodes[nodeModel1Index]
            )[0]
        );
    }
}
