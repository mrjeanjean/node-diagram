import {CanvasModel, DefaultNodeFactory, InputNodeControl, TextareaNodeControl} from "canvas-core";
import {LabelNodeModel} from "./label-node-model";

export class LabelNodeFactory extends DefaultNodeFactory{
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): LabelNodeModel {
        return new LabelNodeModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: LabelNodeModel) {
        nodeModel.setHTMLTitle("Mon Node");
        const inputControl1 = new TextareaNodeControl(nodeModel, "label");
        const inputControl2 = new InputNodeControl(nodeModel, "title");

        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());
        nodeModel.getHTMLBody().appendChild(inputControl2.getHTMLElement());
    }
}
