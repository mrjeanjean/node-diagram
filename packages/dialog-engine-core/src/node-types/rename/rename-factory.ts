import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    InputNodeControl,
    portsTypes,
} from "canvas-core";
import {RenameModel} from "./rename-model";

export class RenameFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): RenameModel {
        return new RenameModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: RenameModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("Rename");
        const inputControl1 = new InputNodeControl(
            nodeModel,
            "name",
            {placeholder: "Enter new name..."}
        );
        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());

        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput);
    }
}
