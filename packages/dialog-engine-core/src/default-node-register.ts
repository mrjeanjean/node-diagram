import {AbstractNodeFactory, CanvasEngine} from "canvas-core";
import {DialogQuoteFactory} from "./node-types/dialog-quote/dialog-quote-factory";
import {DialogQuoteListFactory} from "./node-types/dialog-quote-list/dialog-quote-list-factory";
import {DialogChoiceFactory} from "./node-types/dialog-choice/dialog-choice-factory";
import {DialogChoiceListFactory} from "./node-types/dialog-choice-list/dialog-choice-list-factory";
import {ActivateFactory} from "./node-types/activate/activate-factory";
import {RenameFactory} from "./node-types/rename/rename-factory";

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
    }
}
