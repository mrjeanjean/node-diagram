import {CanvasEngine, portsTypes} from "canvas-core";

const $root = document.getElementById("node-diagram");
let canvasEngine = new CanvasEngine($root);

const node1 = canvasEngine.addNode(-200, -200);
const node2 = canvasEngine.addNode(600, 100);
const node3 = canvasEngine.addNode(600, 400);

const output = canvasEngine.addPort(node1, portsTypes.output);
const output2 = canvasEngine.addPort(node2, portsTypes.output);
const input = canvasEngine.addPort(node2, portsTypes.input);
const input2 = canvasEngine.addPort(node3, portsTypes.input);
canvasEngine.addPort(node1, portsTypes.input);

canvasEngine.addLink(output, input);
canvasEngine.addLink(output2, input2);

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




