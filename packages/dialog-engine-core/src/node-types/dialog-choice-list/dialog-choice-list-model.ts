import {CanvasModel, GroupNodeModel, NodeModel} from "canvas-core";
import {DialogQuoteModel} from "../dialog-quote/dialog-quote-model";

export class DialogChoiceListModel extends GroupNodeModel {
    addDialogQuote():void{
        this.addNode('dialog-choice');
    }
}
