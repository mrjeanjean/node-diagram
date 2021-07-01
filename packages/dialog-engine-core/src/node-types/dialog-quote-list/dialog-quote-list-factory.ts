import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    createGroupNodeActions,
    GroupNodeFactory,
    portsTypes
} from "canvas-core";
import {DialogQuoteListModel} from "./dialog-quote-list-model";

export class DialogQuoteListFactory extends GroupNodeFactory {
    createNodeModel(
        $node: HTMLElement,
        canvasModel: CanvasModel,
        positionX: number,
        positionY: number
    ): DialogQuoteListModel {
        return new DialogQuoteListModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: DialogQuoteListModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("Dialog quote list");

        createGroupNodeActions(nodeModel, canvasEngine);

        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }
}
