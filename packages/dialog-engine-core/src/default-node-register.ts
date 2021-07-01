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

    registerNodeFactory(name: string, nodeFactory: AbstractNodeFactory): void {
        this.canvasEngine.registerNodeFactory(name, nodeFactory);
    }

    registerContextMenuItem(name: string, itemMenuTitle: string = "_default"): void {
        this.canvasEngine.registerContextMenuItem(name, itemMenuTitle);
    }

    registerAllFactories() {
        this.registerNodeFactory("dialog-quote", new DialogQuoteFactory());
        this.registerNodeFactory("dialog-quote-list", new DialogQuoteListFactory());
        this.registerNodeFactory("dialog-choice", new DialogChoiceFactory());
        this.registerNodeFactory("dialog-choice-list", new DialogChoiceListFactory());
        this.registerNodeFactory("activate", new ActivateFactory());
        this.registerNodeFactory("rename", new RenameFactory());
        this.registerNodeFactory("entry", new EntryFactory());
        this.registerNodeFactory("start-game", new StartGameFactory());
        this.registerNodeFactory("end-game", new EndGameFactory());
        this.registerNodeFactory("end-dialog", new EndDialogFactory());
    }

    registerAllContextMenuItems() {
        this.registerContextMenuItem("start-game", "Start Game");
        this.registerContextMenuItem("entry", "Entry");
        this.registerContextMenuItem("dialog-quote", "Dialog quote");
        this.registerContextMenuItem("dialog-quote-list", "Dialog quotes list");
        this.registerContextMenuItem("dialog-choice", "Dialog choice");
        this.registerContextMenuItem("dialog-choice-list", "Dialog choices list");
        this.registerContextMenuItem("activate", "Activation");
        this.registerContextMenuItem("rename", "Rename");
        this.registerContextMenuItem("end-game", "End game");
        this.registerContextMenuItem("end-dialog", "End dialog");
    }
}
