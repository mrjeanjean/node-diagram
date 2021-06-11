import {generateRandomColor, getUniqueID} from "./helpers";
import {DiagramItemModel} from "./models/diagram-item-model";
import {NodeModel} from "./models/node-model";
import {DraggableItem} from "./draggable-item";
import {ZoomableItem} from "./zoomable-item";
import {CanvasModel} from "./models/canvas-model";
import {LayerModel} from "./models/layer-model";

const makeNode = ($container) => {
    let $node = document.createElement("div");
    $node.classList.add("node");
    $node.style.backgroundColor = generateRandomColor()
    $container.appendChild($node);
    return $node;
}

export class CanvasEngine {
    $nodeLayer = null;
    canvasModel;
    $canvas = null;
    draggingTarget = null;
    diagramItems = new Map();

    currentChildren = new Set();
    zoomableItem;

    constructor($container) {
        this.$canvas = this.createCanvas();
        this.$nodeLayer = this.createNodeContainer();

        $container.appendChild(this.$canvas);
        this.$canvas.appendChild(this.$nodeLayer);

        let nodeLayerModel = new LayerModel(this.$nodeLayer, 100, 100);
        this.registerDiagramItem(nodeLayerModel);

        DraggableItem.makeDraggable(this.$canvas, this.onDragStart.bind(this), this.onDrag.bind(this), this.onDragEnd.bind(this));

        this.canvasModel = new CanvasModel(this.$canvas);
        this.canvasModel.addLayer(this.$nodeLayer);

        this.zoomableItem = ZoomableItem.makeZoomable(this.canvasModel);
    }

    getModelFromElement($element) {
        return this.diagramItems.get($element.dataset.diagramItemId);
    }

    registerDiagramItem(model){
        const itemID = getUniqueID();

        // Register as diagram item
        this.diagramItems.set(itemID, model);

        const $HTMLElement = model.getHTMLElement();
        $HTMLElement.dataset.diagramItemId = itemID;

        $HTMLElement.addEventListener("mousedown", (event) => {
            this.onChildMouseDown(event, event.currentTarget);
        })
    }

    onDragStart() {
        // Add node container by default as a child
        this.currentChildren.add(this.$nodeLayer);

        // TODO: change this to handle all children list
        let currentChild = this.currentChildren.values().next().value;
        this.draggingTarget = this.diagramItems.get(currentChild.dataset.diagramItemId);
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

    createNode(positionX = 0, positionY = 0) {
        let $node = makeNode(this.$nodeLayer);
        let nodeModel = new NodeModel($node, this.canvasModel, positionX, positionY);
        this.registerDiagramItem(nodeModel);
    }

    /**
     * @return {HTMLDivElement}
     */
    createCanvas() {
        let $canvas = document.createElement('div');
        $canvas.classList.add("canvas-engine");

        return $canvas;
    }

    /**
     * @return {HTMLDivElement}
     */
    createNodeContainer() {
        let $nodeLayer = document.createElement('div');
        $nodeLayer.classList.add("node-container");
        return $nodeLayer;
    }
}
