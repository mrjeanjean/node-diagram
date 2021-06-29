import './styles.css';

import {getRandom} from "./helpers";
import {createCanvasEngine} from "dialog-engine-core";
const $root = document.getElementById("node-diagram") as HTMLElement;

let canvasEngine = createCanvasEngine($root);
canvasEngine.addNode(10, 10, "dialog-quote");
canvasEngine.addNode(800, 300, "dialog-quote-list");
canvasEngine.addNode(400, 300, "dialog-choice-list");
canvasEngine.addNode(800, 600, "start-game");
canvasEngine.addNode(800, 800, "end-dialog");


const $addNodeButton = document.querySelector(".add-node") as HTMLElement;
$addNodeButton.addEventListener("click", () => {
    canvasEngine.addNode(getRandom(-1000, 2000), getRandom(-1000, 1000), 'dialog-quote-list');
})
