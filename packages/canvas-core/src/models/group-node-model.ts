import {NodeModel} from "./node-model";
import {CanvasModel} from "./canvas-model";

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
}
