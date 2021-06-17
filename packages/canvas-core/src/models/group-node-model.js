import {DiagramItemModel} from "./diagram-item-model";
import {EventDispatcher} from "../event-dispatcher";
import {NodeModel} from "./node-model";

export class GroupNodeModel extends NodeModel{
    nodes = [];

    addNode(type = "default"){
        let $node = this.canvasModel.getCanvasEngine().createNode(this.getHTMLElement(), type);

        let nodeModel = new NodeModel($node, this.canvasModel);
        this.canvasModel.getCanvasEngine().add(nodeModel);

        this.nodes.push(nodeModel);

        this.updateAllNodes();
        return nodeModel;
    }


    onDrag(data) {
        super.onDrag(data);
        this.updateAllNodes();
    }

    updateAllNodes(){
        this.nodes.forEach(node=>{
            node.update();
        });
    }
}
