import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    createGroupNodeActions,
    GroupNodeFactory,
    portsTypes
} from "canvas-core";
import {DialogQuoteListModel} from "./dialog-quote-list-model";
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
        nodeModel.setHTMLTitle("Choice list");
        createGroupNodeActions(nodeModel, ()=>{
            nodeModel.addDialogQuote();
        });
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }
}
