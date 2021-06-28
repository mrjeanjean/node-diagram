import {CanvasModel, GroupNodeModel, NodeModel} from "canvas-core";
import {DialogQuoteModel} from "./dialog-quote-model";

export class DialogQuoteListModel extends GroupNodeModel {
    addDialogQuote():void{
        this.addNode('dialog-quote');
    }
}
