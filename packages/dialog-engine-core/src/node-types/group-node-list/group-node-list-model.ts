import {GroupNodeModel, NodeModel} from "canvas-core";

export class GroupNodeListModel extends GroupNodeModel {
    addNode(type: string = "default"): NodeModel {
        const nodeModel = super.addNode(type);
        nodeModel.removeIOPorts();
        return nodeModel;
    }
}
