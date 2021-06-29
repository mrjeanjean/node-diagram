import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    portsTypes,
} from "canvas-core";
import {ActivateModel} from "./activate-model";

export class ActivateFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): ActivateModel {
        return new ActivateModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: ActivateModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("Activate");
        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput);
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput);
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput);
    }
}
