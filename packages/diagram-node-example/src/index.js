import {CanvasEngine} from "canvas-core";
import {getRandom} from "./helpers";

const $root = document.getElementById("node-diagram");
let canvasEngine = new CanvasEngine($root);


for(let i = 0; i < 20; i++){
    let x = getRandom(-4000, 4000);
    let y = getRandom(-4000, 4000);
    canvasEngine.createNode(x, y);
}

