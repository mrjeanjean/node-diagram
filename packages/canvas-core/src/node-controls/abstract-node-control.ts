import {NodeModel} from "canvas-core";
import {createInput} from "./input-control";

export abstract class AbstractNodeControl<T> {
    nodeModel: NodeModel;
    $control: HTMLElement;
    nodeDataKey: string;
    data: Object;

    constructor(nodeModel: NodeModel, nodeDataKey: string, data: Object = {}) {
        this.nodeModel = nodeModel;
        this.nodeDataKey = nodeDataKey;
        this.data = data;
        this.$control = this.createControl(this.getDataValue(), this.updateNodeData.bind(this));
    }

    abstract createControl(defaultValue:T|null, callback: Function): HTMLElement ;

    private getDataValue(): T|null{
        if(this.nodeModel.getData().hasOwnProperty(this.nodeDataKey)){
            return this.nodeModel.getData()[this.nodeDataKey];
        }
        return null;
    }

    private updateNodeData(value: T) {
        this.nodeModel.setData(this.nodeDataKey, value);
    }

    getHTMLElement(){
        return this.$control;
    }

}
