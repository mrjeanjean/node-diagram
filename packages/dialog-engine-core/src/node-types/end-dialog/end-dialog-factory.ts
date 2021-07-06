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
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }

    getMenuItemName(): string {
        return "End dialog";
    }

    getMenuGroup(): string {
        return "navigation";
    }
}
