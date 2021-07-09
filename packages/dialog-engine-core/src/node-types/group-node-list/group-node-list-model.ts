import {GroupFilterInterface, GroupNodeModel, NodeModel} from "canvas-core";

export class GroupNodeListModel extends GroupNodeModel implements GroupFilterInterface{
    currentFilter: string = "all";
    pickUpNumber: number = 0;

    addNode(type: string = "default"): NodeModel {
        const nodeModel = super.addNode(type);
        nodeModel.removeIOPorts();
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
