import {CanvasModel, DefaultNodeFactory, NodeModel} from "canvas-core";
import {LabelNodeModel} from "./label-node-model";

export class LabelNodeFactory extends DefaultNodeFactory{
    getNodeHTML($container: HTMLElement, type: string): HTMLElement {
        const $node = super.getNodeHTML($container, type);
        const $label = document.createElement("input");
        $label.type = "text";
        $label.value = "TEST";
        $node.appendChild($label);
        return $node;
    }

    getNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): LabelNodeModel {
        console.log("hjdkshdkshkds")
        return new LabelNodeModel($node, canvasModel, positionX, positionY);
    }
}
