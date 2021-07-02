import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel, InputNodeControl,
    portsTypes,
} from "canvas-core";
import {EntryModel} from "./entry-model";

export class EntryFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): EntryModel {
        return new EntryModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: EntryModel, canvasEngine: CanvasEngine) {
        const inputControl1 = new InputNodeControl(
            nodeModel,
            "entryName",
            {placeholder: "Enter entry name..."}
        );
        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());
        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }

    getMenuItemName(): string {
        return "Entry";
    }
}
