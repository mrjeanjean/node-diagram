import './styles.css';

import {createCanvasEngine} from "dialog-engine-core";
import {FontAwesomePortNameAdapter} from "canvas-core";

const $root = document.getElementById("node-diagram") as HTMLElement;

let canvasEngine = createCanvasEngine($root);
canvasEngine.setPortNameAdapter(new FontAwesomePortNameAdapter());

canvasEngine.addNode(400, 300, "dialog-choice-list");
canvasEngine.addNode(800, 600, "rename");
canvasEngine.addNode(800, 800, "activate");
