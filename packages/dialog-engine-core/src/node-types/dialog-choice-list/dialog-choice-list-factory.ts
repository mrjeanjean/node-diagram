import {
    CanvasEngine,
    CanvasModel, contextTypes,
    createGroupNodeActions,
    GroupNodeFactory,
    portsTypes
} from "canvas-core";
import {DialogChoiceListModel} from "./dialog-choice-list-model";

export class DialogChoiceListFactory extends GroupNodeFactory {
    createNodeModel(
        $node: HTMLElement,
        canvasModel: CanvasModel,
        positionX: number,
        positionY: number
    ): DialogChoiceListModel {
        return new DialogChoiceListModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: DialogChoiceListModel, canvasEngine: CanvasEngine) {
        createGroupNodeActions(nodeModel, canvasEngine, contextTypes.choices);
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }

    getMenuItemName(): string {
        return "Choice list";
    }

    getMenuGroup(): string {
        return "dialog";
    }
}
