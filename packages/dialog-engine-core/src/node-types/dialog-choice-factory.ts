import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    portsTypes,
    TextareaNodeControl
} from "canvas-core";
import {DialogQuoteModel} from "./dialog-quote-model";

export class DialogChoiceFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): DialogQuoteModel {
        return new DialogQuoteModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: DialogQuoteModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("Mon Node");
        const inputControl1 = new TextareaNodeControl(
            nodeModel,
            "quote",
            {placeholder: "Insert choice dialog quote..."}
        );

        nodeModel.getHTMLBody().appendChild(inputControl1.getHTMLElement());

        canvasEngine.addPort(nodeModel, portsTypes.actionOutput);
    }
}
