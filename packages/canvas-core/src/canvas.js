import {generateRandomColor, getUniqueID} from "./helpers";
import {NodeModel} from "./models/node-model";
import {ZoomableItem} from "./zoomable-item";
import {CanvasModel} from "./models/canvas-model";
import {LayerModel} from "./models/layer-model";
import {CanvasEventsHandler} from "./canvas-events-handler";
import {LinkModel} from "./models/link-model";

export class CanvasEngine {
    $nodeLayer;
    canvasModel;
    $canvas;
    $linkLayer;
    canvasEventsHandler;
    links = [];

    constructor($container) {
        // Create HTML elements
        this.$canvas = this.createCanvas();
        $container.appendChild(this.$canvas);

        this.$nodeLayer = this.createNodeLayer();
        this.$canvas.appendChild(this.$nodeLayer);

        this.$linkLayer = this.createLinkLayer();
        this.$canvas.appendChild(this.$linkLayer);

        // Create main models
        this.canvasModel = new CanvasModel(this.$canvas);

        // Add node layer
        let nodeLayerModel = new LayerModel(this.$nodeLayer);
        const {itemID: nodeLayerID} = this.decorateDiagramItem(this.$nodeLayer);
        this.canvasModel.addItem(nodeLayerID, nodeLayerModel);
        this.canvasModel.addLayer(nodeLayerModel);

        // Add node layer
        let linkLayerModel = new LayerModel(this.$linkLayer);
        const {itemID: linkLayerID} = this.decorateDiagramItem(this.$linkLayer);
        this.canvasModel.addItem(linkLayerID, linkLayerModel);
        this.canvasModel.addLayer(linkLayerModel);

        // Add user event handlers
        this.canvasEventsHandler = new CanvasEventsHandler(this.canvasModel);
        ZoomableItem.makeZoomable(this.canvasModel);
    }

    decorateDiagramItem($item) {
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
        const {itemID: nodeID} = this.decorateDiagramItem($node);

        $node.addEventListener("mousedown", (event) => {
            this.canvasEventsHandler.onItemMouseDown(event.currentTarget);
        })

        this.canvasModel.addItem(nodeID, nodeModel);
        nodeModel.setId(nodeID);
        return nodeModel;
    }

    addLink(startNodeID, endNodeID) {
        let $link = this.createLink(this.$linkLayer);
        let startNode = this.canvasModel.getModelFromId(startNodeID);
        let endNode = this.canvasModel.getModelFromId(endNodeID);

        let linkModel = new LinkModel($link, startNode, endNode);
        const {itemID: linkID} = this.decorateDiagramItem($link);

        linkModel.setId(linkID);

        startNode.addLink(linkModel);
        endNode.addLink(linkModel);

        this.links.push({
            startNodeID,
            endNodeID,
            id: getUniqueID()
        })
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
    createNodeLayer() {
        let $nodeLayer = document.createElement('div');
        $nodeLayer.classList.add("node-layer");
        return $nodeLayer;
    }

    /**
     * @return {SVGSVGElement}
     */
    createLinkLayer() {
        let $linkLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        $linkLayer.classList.add("link-layer");
        return $linkLayer;
    }

    /**
     * @return {HTMLDivElement}
     */
    createNode($container) {
        let $node = document.createElement("div");
        $node.classList.add("node");
        $node.style.backgroundColor = generateRandomColor()
        $container.appendChild($node);
        return $node;
    }

    /**
     * @return {SVGLineElement}
     */
    createLink($container) {
        let $link = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        $link.classList.add("link");
        $container.appendChild($link);
        return $link;
    }
}
