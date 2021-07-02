import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel, contextTypes,
    portsTypes,
    TextareaNodeControl
} from "canvas-core";
import {DialogQuoteModel} from "./dialog-quote-model";

export class DialogQuoteFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): DialogQuoteModel {
        return new DialogQuoteModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: DialogQuoteModel, canvasEngine: CanvasEngine) {
        const inputControl1 = new TextareaNodeControl(
            nodeModel,
            "quote",
            {placeholder: "Insert dialog quote..."}
        );

        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());

        canvasEngine.addPort(nodeModel, portsTypes.input);
        canvasEngine.addPort(nodeModel, portsTypes.output);
    }

    getMenuItemName(): string {
        return "Quote";
    }

    displayOnContextMenu(context: string): boolean {
        return context === contextTypes.main || context === contextTypes.group;
    }
}
