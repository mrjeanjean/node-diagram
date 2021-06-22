import {NodeModel} from "./node-model";

export class GroupNodeModel extends NodeModel {
    nodes: Array<NodeModel> = [];

    addNode(type = "default") {
        let nodeModel = this.canvasModel.getCanvasEngine().addNode(0,
            0,
            type,
            this.getHTMLBody() as HTMLElement,
            false
        );
        this.nodes.push(nodeModel);

        this.updateAllNodes();
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
}
