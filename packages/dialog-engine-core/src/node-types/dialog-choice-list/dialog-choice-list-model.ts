import { GroupNodeModel} from "canvas-core";

export class DialogChoiceListModel extends GroupNodeModel {
    addDialogQuote():void{
        this.addNode('dialog-choice');
    }
}
