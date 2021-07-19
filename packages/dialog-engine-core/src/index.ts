import {AbstractNodeFactory, CanvasEngine} from "canvas-core";
import {DefaultNodeRegister} from "./default-node-register";
import {DialogQuoteBuilderFactory} from "./node-types/dialog-quote/dialog-quote-builder-factory";

let canvasEngine: CanvasEngine;

export const createCanvasEngine = ($root:HTMLElement) =>{
    canvasEngine = new CanvasEngine($root);
    const defaultNodeRegister = new DefaultNodeRegister(canvasEngine);
    defaultNodeRegister.registerAllFactories();

    addDialogCharacter("Michel", "michel");
    addDialogCharacter("Heros", "heros");
    addDialogCharacter("Madame", "madame");

    return canvasEngine;
}

export const addDialogCharacter = (characterName: string, characterSlug: string, color?: string)=>{
    const characterNodeFactory = new DialogQuoteBuilderFactory(characterName) as AbstractNodeFactory;
    canvasEngine.registerNodeFactory(characterSlug, characterNodeFactory);
    canvasEngine.registerContextMenuItem(characterSlug, characterNodeFactory);
}
