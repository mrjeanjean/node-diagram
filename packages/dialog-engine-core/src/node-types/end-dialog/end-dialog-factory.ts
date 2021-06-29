import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    portsTypes,
} from "canvas-core";
import {EndDialogModel} from "./end-dialog-model";

export class EndDialogFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): EndDialogModel {
        return new EndDialogModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: EndDialogModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("End dialog");
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }
}
