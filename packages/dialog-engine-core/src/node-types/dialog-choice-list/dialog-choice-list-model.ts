import {GroupNodeModel, NodeModel, portsTypes} from "canvas-core";

export class DialogChoiceListModel extends GroupNodeModel {
    addNode(type: string = "default"): NodeModel {
        const nodeModel = super.addNode(type);
        nodeModel.removeIOPorts();
        this.canvasModel.getCanvasEngine().addPort(nodeModel, portsTypes.outputRight);
        return nodeModel;
    }
}
