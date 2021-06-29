import {AbstractNodeFactory, CanvasEngine} from "canvas-core";
import {DialogQuoteFactory} from "./node-types/dialog-quote/dialog-quote-factory";
import {DialogQuoteListFactory} from "./node-types/dialog-quote-list/dialog-quote-list-factory";
import {DialogChoiceFactory} from "./node-types/dialog-choice/dialog-choice-factory";
import {DialogChoiceListFactory} from "./node-types/dialog-choice-list/dialog-choice-list-factory";
import {ActivateFactory} from "./node-types/activate/activate-factory";
import {RenameFactory} from "./node-types/rename/rename-factory";
import {EntryFactory} from "./node-types/entry/entry-factory";
import {StartGameFactory} from "./node-types/start-game/start-game-factory";
import {EndDialogFactory} from "./node-types/end-dialog/end-dialog-factory";
import {EndGameFactory} from "./node-types/end-game/end-game-factory";


export class DefaultNodeRegister {
    canvasEngine: CanvasEngine

    constructor(canvasEngine: CanvasEngine) {
        this.canvasEngine = canvasEngine;
    }

    register(name: string, nodeFactory: AbstractNodeFactory) {
        this.canvasEngine.registerNodeFactory(name, nodeFactory);
    }

    registerAllDefault() {
        this.register("dialog-quote", new DialogQuoteFactory());
        this.register("dialog-quote-list", new DialogQuoteListFactory());
        this.register("dialog-choice", new DialogChoiceFactory());
        this.register("dialog-choice-list", new DialogChoiceListFactory());
        this.register("activate", new ActivateFactory());
        this.register("rename", new RenameFactory());
        this.register("entry", new EntryFactory());
        this.register("start-game", new StartGameFactory());
        this.register("end-game", new EndGameFactory());
        this.register("end-dialog", new EndDialogFactory());
    }
}
