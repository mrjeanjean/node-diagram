import {GroupFilterInterface, GroupNodeModel, NodeModel, portsTypes} from "canvas-core";

export class DialogChoiceListModel extends GroupNodeModel implements GroupFilterInterface{
    currentFilter: string = "all";
    pickUpNumber: number = -1;

    addNode(type: string = "default"): NodeModel {
        const nodeModel = super.addNode(type);
        nodeModel.removeIOPorts();
        this.canvasModel.getCanvasEngine().addPort(nodeModel, portsTypes.outputRight);
        return nodeModel;
    }

    getFilter(): string {
        return this.currentFilter;
    }

    setFilter(filter: string): void {
        this.currentFilter = filter;
    }

    getPickUpNumber(): number {
        return this.pickUpNumber;
    }

    setPickUpNumber(value: number): void {
        this.pickUpNumber = value;
    }
}
