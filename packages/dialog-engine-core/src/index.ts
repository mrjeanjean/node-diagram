import {CanvasEngine} from "canvas-core";
import {DefaultNodeRegister} from "./default-node-register";

let canvasEngine;

export const createCanvasEngine = ($root:HTMLElement) =>{
    canvasEngine = new CanvasEngine($root);
    const defaultNodeRegister = new DefaultNodeRegister(canvasEngine);
    defaultNodeRegister.registerAllFactories();
    return canvasEngine;
}
