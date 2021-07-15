import './styles.css';

import {createCanvasEngine} from "dialog-engine-core";
import {FontAwesomePortNameAdapter} from "canvas-core";
import {DialogChoiceListModel} from "dialog-engine-core/src/node-types/dialog-choice-list/dialog-choice-list-model";

const $root = document.getElementById("node-diagram") as HTMLElement;

let canvasEngine = createCanvasEngine($root);
canvasEngine.setPortNameAdapter(new FontAwesomePortNameAdapter());

/*let groupNode = canvasEngine.addNode(400, 100, "dialog-choice-list") as DialogChoiceListModel;
canvasEngine.addNode(800, 600, "rename");
canvasEngine.addNode(800, 800, "activate");

groupNode.addNode("dialog-choice");
groupNode.addNode("michel");
groupNode.addNode("heros");*/

canvasEngine.addNode(900, 50, "start-game");
