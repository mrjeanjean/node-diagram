import {makeDraggable} from "./make-draggable";
import {makeZoomable} from "./make-zoomable";
import {generateRandomColor, getUniqueID} from "./helpers";
import {DiagramItemModel} from "./diagram-item-model";
import {NodeModel} from "./node-model";

const makeNode = ($container) => {
    let $node = document.createElement("div");
    $node.classList.add("node");
    $node.style.backgroundColor = generateRandomColor()
    $container.appendChild($node);
    return $node;
}

/*export const CanvasEngine = () => {
    let $nodeContainer = null;

    const createCanvas = ($container) => {
        let $canvas = document.createElement("div");
        $canvas.classList.add("canvas-engine");

        $nodeContainer = document.createElement("div");
        $nodeContainer.classList.add("node-container");

        $canvas.appendChild($nodeContainer);
        $container.appendChild($canvas);

        for (let i = 0; i < 1000; i++) {
            makeNode($nodeContainer);
        }

        makeDraggable($nodeContainer, $canvas);
        makeZoomable($canvas, $nodeContainer);

        return $canvas;
    }

    return {
        createCanvas
    }
}*/

export class CanvasEngine {
    $nodeContainer = null;
    $canvas = null;
    draggingTarget = null;
    childrenList = new Map();

    currentChildren = new Set();
    getZoom = null;

    constructor($container) {
        this.$canvas = this.createCanvas();
        this.$nodeContainer = this.createNodeContainer();

        $container.appendChild(this.$canvas);
        this.$canvas.appendChild(this.$nodeContainer);

        let nodeContainerId = getUniqueID();
        let nodeContainerModel = new DiagramItemModel(this.$nodeContainer, 100, 100);
        this.childrenList.set(nodeContainerId, nodeContainerModel);
        this.$nodeContainer.dataset.diagramItemId = nodeContainerId;

        makeDraggable(this.$canvas, this.onDragStart.bind(this), this.onDrag.bind(this), this.onDragEnd.bind(this));
        const {getCurrentZoom} = makeZoomable(this.$canvas, this.$nodeContainer);
        this.getZoom = getCurrentZoom;
    }

    /**
     * @return {HTMLDivElement}
     */
    createCanvas() {
        let $canvas = document.createElement('div');
        $canvas.classList.add("canvas-engine");

        return $canvas;
    }

    getModelFromElement($element){
        return this.childrenList.get($element.dataset.diagramItemId);
    }

    onDragStart() {
        // Add node container by default as a child
        this.currentChildren.add(this.$nodeContainer);

        // TODO: change this to handle all children list
        let currentChild = this.currentChildren.values().next().value;
        this.draggingTarget = this.childrenList.get(currentChild.dataset.diagramItemId);
    }

    onDrag(data) {
        this.draggingTarget?.onDrag(data);
    }

    onDragEnd(data) {
        console.log("END", data);
        this.draggingTarget?.endDrag(data);
        this.currentChildren.clear();
        this.draggingTarget = null;
    }

    onChildMouseDown(event, $element) {
        this.currentChildren.add($element);
    }

    /**
     * @return {HTMLDivElement}
     */
    createNodeContainer() {
        let $nodeContainer = document.createElement('div');
        $nodeContainer.classList.add("node-container");
        $nodeContainer.addEventListener("mousedown", (event) => {
            this.onChildMouseDown(event, event.currentTarget);
        })
        return $nodeContainer;
    }

    createNode(positionX = 0, positionY = 0){
        let nodeContainerId = getUniqueID();
        let $node = makeNode(this.$nodeContainer);
        let nodeModel = new NodeModel($node, this.getZoom,positionX, positionY);
        this.childrenList.set(nodeContainerId, nodeModel);
        $node.dataset.diagramItemId = nodeContainerId;

        // Attach mouse down to trigger canvas when clicking
        // TODO: create factory for DiagramModel and DiagramItem
        $node.addEventListener("mousedown", (event) => {
            this.onChildMouseDown(event, event.currentTarget);
        })
    }
}
