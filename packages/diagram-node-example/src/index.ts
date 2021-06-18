import {CanvasEngine, portsTypes} from "canvas-core";
import {getRandom} from "./helpers";

const $root = document.getElementById("node-diagram") as HTMLElement;
let canvasEngine = new CanvasEngine($root);

const node1 = canvasEngine.addNode(-200, -200);
/*const node2 = canvasEngine.addNode(600, 100);
const node3 = canvasEngine.addNode(600, 400);*/

const node2 = canvasEngine.addNode(-200, 200);
const node3 = canvasEngine.addNode(600, 400);
const node4 = canvasEngine.addNode(-800, 200);

const output = canvasEngine.addPort(node1, portsTypes.output);
const input = canvasEngine.addPort(node2, portsTypes.input);
const output2 = canvasEngine.addPort(node1, portsTypes.actionOutput);
const output3 = canvasEngine.addPort(node4, portsTypes.actionOutput);
const input3 = canvasEngine.addPort(node2, portsTypes.actionInput);
const input2 = canvasEngine.addPort(node3, portsTypes.actionInput);

canvasEngine.addPort(node3, portsTypes.input);
canvasEngine.addPort(node1, portsTypes.actionOutput);

canvasEngine.addLink(output2, input2);
canvasEngine.addLink(output, input);
canvasEngine.addLink(output3, input3);

const groupNode = canvasEngine.addGroupNode(1200, 500);

const addSubNode = () => {
    const newNode = groupNode.addNode();
    canvasEngine.addPort(newNode, portsTypes.actionInput);
    canvasEngine.addPort(newNode, portsTypes.actionOutput);
}

addSubNode();
addSubNode();

canvasEngine.addPort(groupNode, portsTypes.input);


const $addNodeButton = document.querySelector(".add-node") as HTMLElement;
$addNodeButton.addEventListener("click", () => {
    const node = canvasEngine.addNode(getRandom(-1000, 2000), getRandom(-1000, 1000));

    canvasEngine.addPort(node, portsTypes.input);
    canvasEngine.addPort(node, portsTypes.output);
})

const $addSubNodeButton = document.querySelector(".add-subnode") as HTMLElement;
$addSubNodeButton.addEventListener("click", addSubNode);

/*const nodes = [];

for (let i = 0; i < 20; i++) {
    let x = getRandom(-1200, 1200);
    let y = getRandom(-1200, 1200);
    let node = canvasEngine.addNode(x, y);
    //nodes.push(node);
}


const getRandomPairOfNode = () => {
    let nodesClone = [...nodes];
    const randNumber = getRandom(0, nodesClone.length - 1);
    const node1 = nodesClone[randNumber];
    nodesClone.splice(randNumber, 1);
    const node2 = nodesClone[getRandom(0, nodesClone.length - 1)]

    return {
        node1,
        node2
    }
}

for (let j = 0; j < 10; j++) {
    const {node1, node2} = getRandomPairOfNode();
    canvasEngine.addLink(node1.getId(), node2.getId());
}*/



