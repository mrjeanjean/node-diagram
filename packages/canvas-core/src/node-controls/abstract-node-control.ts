import {NodeModel} from "canvas-core";
import {createInput} from "./input-control";

export abstract class AbstractNodeControl<T> {
    nodeModel: NodeModel;
    $control: HTMLElement;
    nodeDataKey: string;

    constructor(nodeModel: NodeModel, nodeDataKey: string) {
        this.nodeModel = nodeModel;
        this.nodeDataKey = nodeDataKey;
        this.$control = this.createControl(this.getDataValue(), this.updateNodeData.bind(this));
    }

    abstract createControl(defaultValue:T|null, callback: Function): HTMLElement ;

    private getDataValue(): T|null{
        if(this.nodeModel.getData().hasOwnProperty(this.nodeDataKey)){
            return this.nodeModel.getData()[this.nodeDataKey];
        }
        return null;
    }

    private updateNodeData(value: string) {
        let nodeData = {...this.nodeModel.getData()};

        if (nodeData.hasOwnProperty(this.nodeDataKey)) {
            nodeData[this.nodeDataKey] = value;
            this.nodeModel.setData(nodeData);
        }
    }

    getHTMLElement(){
        return this.$control;
    }

}
