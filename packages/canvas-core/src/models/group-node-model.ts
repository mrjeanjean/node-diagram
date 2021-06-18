import {NodeModel} from "./node-model";

export class GroupNodeModel extends NodeModel {
    nodes: Array<NodeModel> = [];

    addNode(type = "default") {
        let $node = this.canvasModel.getCanvasEngine().createNode(this.getHTMLElement() as HTMLElement, type);

        let nodeModel = new NodeModel($node, this.canvasModel);
        this.canvasModel.getCanvasEngine().add(nodeModel);

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
