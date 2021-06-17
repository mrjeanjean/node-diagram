import {createSVGElement, generateRandomColor, getUniqueID} from "./helpers";
import {NodeModel} from "./models/node-model";
import {ZoomableItem} from "./zoomable-item";
import {CanvasModel} from "./models/canvas-model";
import {LayerModel} from "./models/layer-model";
import {CanvasEventsHandler} from "./canvas-events-handler";
import {LinkModel} from "./models/link-model";
import {PortModel} from "./models/port-model";
import {portsTypes} from "./ports/ports-types";
import {GroupNodeModel} from "./models/group-node-model";

export class CanvasEngine {
    $nodeLayer;
    canvasModel;
    $canvas;
    $linkLayer;
    canvasEventsHandler;

    constructor($container) {
        // Create HTML elements
        this.$canvas = this.createCanvas();
        $container.appendChild(this.$canvas);

        this.$nodeLayer = this.createNodeLayer();
        this.$canvas.appendChild(this.$nodeLayer);

        this.$linkLayer = this.createLinkLayer();
        this.$canvas.appendChild(this.$linkLayer);

        // Create main models
        this.canvasModel = new CanvasModel(this.$canvas, this);

        // Add node layer
        let nodeLayerModel = new LayerModel(this.$nodeLayer);
        const {itemID: nodeLayerID} = this.decorateDiagramItem(this.$nodeLayer);
        this.canvasModel.addItem(nodeLayerID, nodeLayerModel);
        this.canvasModel.addLayer("node-layer", nodeLayerModel);

        // Add link layer
        const linkLayerModel = new LayerModel(this.$linkLayer);
        const {itemID: linkLayerID} = this.decorateDiagramItem(this.$linkLayer);
        this.canvasModel.addItem(linkLayerID, linkLayerModel);
        this.canvasModel.addLayer("link-layer", linkLayerModel);

        // Add user event handlers
        this.canvasEventsHandler = new CanvasEventsHandler(this.canvasModel);
        ZoomableItem.makeZoomable(this.canvasModel);

        this.canvasModel.updateZoom();
    }

    decorateDiagramItem($item) {
        const itemID = getUniqueID();
        $item.dataset.diagramItemId = itemID;

        return {
            $item,
            itemID
        }
    }

    add(itemModel) {
        const {itemID: itemID} = this.decorateDiagramItem(itemModel.getHTMLElement());
        this.canvasModel.addItem(itemID, itemModel);
        itemModel.setId(itemID);
    }

    addNode(positionX = 0, positionY = 0, type = "default") {
        let $node = this.createNode(this.$nodeLayer, type);

        let nodeModel = new NodeModel($node, this.canvasModel, positionX, positionY);
        const {itemID: nodeID} = this.decorateDiagramItem($node);

        this.canvasEventsHandler.addItem(nodeModel);

        this.canvasModel.addItem(nodeID, nodeModel);
        nodeModel.setId(nodeID);
        return nodeModel;
    }

    addGroupNode(positionX = 0, positionY = 0) {
        let $node = this.createNode(this.$nodeLayer, "group-node");

        let nodeModel = new GroupNodeModel($node, this.canvasModel, positionX, positionY);
        const {itemID: nodeID} = this.decorateDiagramItem($node);

        this.canvasEventsHandler.addItem(nodeModel);

        this.canvasModel.addItem(nodeID, nodeModel);
        nodeModel.setId(nodeID);
        return nodeModel;
    }

    addLink(startPortModel, endPortModel) {
        let $link = this.createLink(this.$linkLayer);

        let linkModel = new LinkModel($link, startPortModel, endPortModel, "#666");
        const {itemID: linkID} = this.decorateDiagramItem($link);
        linkModel.setId(linkID);

        this.canvasEventsHandler.addItem(linkModel);

        startPortModel.addLink(linkModel);
        endPortModel.addLink(linkModel);
    }

    removeLink(linkModel) {
        linkModel.startPort.removeLink(linkModel);
        linkModel.endPort.removeLink(linkModel);
        this.canvasEventsHandler.removeItem(linkModel);
        linkModel.getHTMLElement().remove();
    }

    addPort(nodeModel, portType) {
        let $portContainer = nodeModel.getHTMLElement().querySelector(`:scope > .port-container--${portType}`);
        let $port = this.createPort($portContainer, portType);

        let portModel = new PortModel($port, portType, nodeModel, this.canvasModel);
        const {itemID: portID} = this.decorateDiagramItem($port);

        this.canvasEventsHandler.addItem(portModel);
        portModel.setId(portID);
        nodeModel.addPort(portModel);
        return portModel;
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
    createNode($container, type) {
        let $node = document.createElement("div");
        $node.classList.add("node");
        $node.classList.add(`node-${type}`);

        $node.style.backgroundColor = generateRandomColor();

        $node.appendChild(this.createPortContainer(portsTypes.input));
        $node.appendChild(this.createPortContainer(portsTypes.output));
        $node.appendChild(this.createPortContainer(portsTypes.actionInput));
        $node.appendChild(this.createPortContainer(portsTypes.actionOutput));

        $container.appendChild($node);
        return $node;
    }

    /**
     * @return {HTMLDivElement}
     */
    createPortContainer(portType) {
        let $portContainer = document.createElement("div");
        $portContainer.classList.add("port-container", `port-container--${portType}`);
        return $portContainer;
    }

    /**
     * @return {SVGElement}
     */
    createLink($container) {
        let $linkGroup = createSVGElement("g");
        let $link = createSVGElement("path");
        let $LinkHandle = createSVGElement("path");

        $linkGroup.classList.add("link__wrapper");
        $link.classList.add("link");
        $LinkHandle.classList.add("link-handle");

        $linkGroup.appendChild($link);
        $linkGroup.appendChild($LinkHandle);

        $container.appendChild($linkGroup);
        return $linkGroup;
    }

    /**
     * @return {HTMLDivElement}
     */
    createPort($node, portType) {
        let $port = document.createElement("div");
        $port.classList.add("port");
        $port.classList.add(`port-${portType}`);

        let $innerPort = document.createElement("div");
        $innerPort.classList.add("port__inner");

        $port.appendChild($innerPort);
        $node.appendChild($port);

        return $port;
    }
}
