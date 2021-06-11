import {generateRandomColor, getUniqueID} from "./helpers";
import {NodeModel} from "./models/node-model";
import {ZoomableItem} from "./zoomable-item";
import {CanvasModel} from "./models/canvas-model";
import {LayerModel} from "./models/layer-model";
import {CanvasEventsHandler} from "./canvas-events-handler";

export class CanvasEngine {
    $nodeLayer;
    canvasModel;
    $canvas;
    canvasEventsHandler;

    constructor($container) {
        // Create HTML elements
        this.$canvas = this.createCanvas();
        this.$nodeLayer = this.createNodeContainer();
        $container.appendChild(this.$canvas);
        this.$canvas.appendChild(this.$nodeLayer);

        // Create main models
        let nodeLayerModel = new LayerModel(this.$nodeLayer);
        this.canvasModel = new CanvasModel(this.$canvas);

        this.canvasModel.addLayer(nodeLayerModel);
        const {itemID:layerID} = this.decorateDiagramItem(this.$nodeLayer);
        this.canvasModel.addItem(layerID, nodeLayerModel);

        this.canvasEventsHandler = new CanvasEventsHandler(this.canvasModel);
        ZoomableItem.makeZoomable(this.canvasModel);
    }

    decorateDiagramItem($item){
        const itemID = getUniqueID();
        $item.dataset.diagramItemId = itemID;

        return {
            $item,
            itemID
        }
    }

    addNode(positionX = 0, positionY = 0) {
        let $node = this.createNode(this.$nodeLayer);
        let nodeModel = new NodeModel($node, this.canvasModel, positionX, positionY);
        const {itemID:nodeID} =  this.decorateDiagramItem($node);

        $node.addEventListener("mousedown", (event) => {
            this.canvasEventsHandler.onItemMouseDown(event.currentTarget);
        })

        this.canvasModel.addItem(nodeID, nodeModel);
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

    /**
     * @return {HTMLDivElement}
     */
    createNode($container){
        let $node = document.createElement("div");
        $node.classList.add("node");
        $node.style.backgroundColor = generateRandomColor()
        $container.appendChild($node);
        return $node;
    }
}
