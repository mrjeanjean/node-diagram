import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel, contextTypes,
    portsTypes,
    TextareaNodeControl
} from "canvas-core";
import {DialogChoiceModel} from "./dialog-choice-model";

export class DialogChoiceFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): DialogChoiceModel {
        return new DialogChoiceModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: DialogChoiceModel, canvasEngine: CanvasEngine) {
        const inputControl1 = new TextareaNodeControl(
            nodeModel,
            "quote",
            {placeholder: "Insert choice quote..."}
        );

        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());

        canvasEngine.addPort(nodeModel, portsTypes.outputRight);
    }

    getMenuItemName(): string {
        return "Choice";
    }

    displayOnContextMenu(context: string): boolean {
        return context === contextTypes.choices;
    }

    getMenuGroup(): string {
        return "dialog";
    }
}
