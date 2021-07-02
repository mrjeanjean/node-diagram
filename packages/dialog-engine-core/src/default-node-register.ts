import {AbstractNodeFactory, CanvasEngine} from "canvas-core";
import {DialogQuoteFactory} from "./node-types/dialog-quote/dialog-quote-factory";
import {DialogChoiceFactory} from "./node-types/dialog-choice/dialog-choice-factory";
import {DialogChoiceListFactory} from "./node-types/dialog-choice-list/dialog-choice-list-factory";
import {ActivateFactory} from "./node-types/activate/activate-factory";
import {RenameFactory} from "./node-types/rename/rename-factory";
import {EntryFactory} from "./node-types/entry/entry-factory";
import {StartGameFactory} from "./node-types/start-game/start-game-factory";
import {EndDialogFactory} from "./node-types/end-dialog/end-dialog-factory";
import {EndGameFactory} from "./node-types/end-game/end-game-factory";
import {GroupNodeListFactory} from "./node-types/group-node-list/group-node-list-factory";

export class DefaultNodeRegister {
    canvasEngine: CanvasEngine

    constructor(canvasEngine: CanvasEngine) {
        this.canvasEngine = canvasEngine;
    }

    registerNodeFactory(name: string, nodeFactory: AbstractNodeFactory): void {
        this.canvasEngine.registerNodeFactory(name, nodeFactory);
        this.canvasEngine.registerContextMenuItem(name, nodeFactory);
    }

    registerAllFactories() {
        this.registerNodeFactory("dialog-quote", new DialogQuoteFactory());
        this.registerNodeFactory("group-node-list", new GroupNodeListFactory());
        this.registerNodeFactory("dialog-choice", new DialogChoiceFactory());
        this.registerNodeFactory("dialog-choice-list", new DialogChoiceListFactory());
        this.registerNodeFactory("activate", new ActivateFactory());
        this.registerNodeFactory("rename", new RenameFactory());
        this.registerNodeFactory("entry", new EntryFactory());
        this.registerNodeFactory("start-game", new StartGameFactory());
        this.registerNodeFactory("end-game", new EndGameFactory());
        this.registerNodeFactory("end-dialog", new EndDialogFactory());
    }
}
