import {CanvasEngine} from "canvas-core";
import {getRandom} from "./helpers";

const $root = document.getElementById("node-diagram");
let canvasEngine = new CanvasEngine($root);


for(let i = 0; i < 20; i++){
    let x = getRandom(-1200, 1200);
    let y = getRandom(-1200, 1200);
    canvasEngine.addNode(x, y);
}

