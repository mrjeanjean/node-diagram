import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel, contextTypes,
    portsTypes,
} from "canvas-core";
import {ActivateModel} from "./activate-model";

export class ActivateFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): ActivateModel {
        return new ActivateModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: ActivateModel, canvasEngine: CanvasEngine) {
        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput, "activate");
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput, "deactivate");
        canvasEngine.addPort(nodeModel, portsTypes.actionOutput, "toggleActivation");
    }

    getMenuItemName(): string {
        return "Activate";
    }

    displayOnContextMenu(context: string): boolean {
        return context === contextTypes.main || context === contextTypes.group;
    }

    getMenuGroup(): string {
        return "actions";
    }
}
