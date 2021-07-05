import {NodeModel} from "./models/node-model";
import {ZoomableItem} from "./zoomable-item";
import {CanvasModel} from "./models/canvas-model";
import {LayerModel} from "./models/layer-model";
import {CanvasEventsHandler} from "./canvas-events-handler";
import {LinkModel} from "./models/link-model";
import {PortModel} from "./models/port-model";
import {getUniqueID} from "./utils/helpers";
import {ItemsFactories} from "./factories/items-factories";
import {NodeFactory} from "./factories/factory-interface";
import {DefaultLinkFactory} from "./factories/default-link-factory";
import {portsTypes} from "./ports/ports-types";
import {PortNameAdapter} from "./ports/port-name-adapter";
import {DefaultPortNameAdapter} from "./ports/default-port-name-adapter";
import {canBeActivated} from "./interfaces/activatable-interface";
import {canBeRenamed} from "./interfaces/renamable-interface";
import {ContextMenuManager} from "./context-menu/context-menu-manager";
import {ContextMenu} from "./context-menu/context-menu";

export class CanvasEngine {
    $canvas: HTMLElement;
    $nodeLayer: HTMLElement;
    $linkLayer: SVGElement;
    canvasModel: CanvasModel;
    canvasEventsHandler: CanvasEventsHandler;
    itemsFactories: ItemsFactories;
    portNameAdapter: PortNameAdapter;
    contextMenuManager: ContextMenuManager;

    constructor($container: HTMLElement) {
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
        const {itemId: nodeLayerID} = this.decorateDiagramItem(this.$nodeLayer);
        this.canvasModel.addItem(nodeLayerID, nodeLayerModel);
        this.canvasModel.addLayer("node-layer", nodeLayerModel);

        // Add link layer
        const linkLayerModel = new LayerModel(this.$linkLayer);
        const {itemId: linkLayerID} = this.decorateDiagramItem(this.$linkLayer);
        this.canvasModel.addItem(linkLayerID, linkLayerModel);
        this.canvasModel.addLayer("link-layer", linkLayerModel);

        // Create item factories
        this.itemsFactories = new ItemsFactories();
        this.itemsFactories.registerLinkFactory("default", new DefaultLinkFactory());

        // Add user event handlers
        this.canvasEventsHandler = new CanvasEventsHandler(this.canvasModel);
        ZoomableItem.makeZoomable(this.canvasModel);

        // Port name adapter
        this.portNameAdapter = new DefaultPortNameAdapter();

        // Add node menu constructor
        this.contextMenuManager = new ContextMenuManager(this, this.$canvas);
        document.addEventListener("contextmenu", (event: MouseEvent) => {
            event.preventDefault();
            let contextMenu = new ContextMenu({
                x: event.clientX,
                y: event.clientY
            }, {
                onItemSelect: (data: any) => {
                    this.addNode(data.position.x, data.position.y, data.nodeName)
                }
            });

            contextMenu.addItemsFilter((itemsList: Map<string, NodeFactory>)=>{
                return itemsList;
            });

            this.contextMenuManager.show(contextMenu);
        });

        this.canvasModel.updateZoom();
    }

    registerNodeFactory(type: string, nodeFactory: NodeFactory) {
        this.itemsFactories.registerNodeFactory(type, nodeFactory);
    }

    registerContextMenuItem(type: string, nodeFactory: NodeFactory) {
        this.contextMenuManager.add(type, nodeFactory);
    }

    decorateDiagramItem($item: HTMLElement | SVGElement): { $item: HTMLElement | SVGElement, itemId: string } {
        const itemId = getUniqueID();
        $item.dataset.diagramItemId = itemId;

        return {
            $item,
            itemId
        }
    }

    addNode(positionX: number = 0,
            positionY: number = 0,
            type: string = "default",
            $container: HTMLElement = this.$nodeLayer,
            isDraggable: boolean = true
    ): NodeModel {

        let nodeFactory = this.itemsFactories.getNodeFactory(type);

        let $node = nodeFactory.createNodeHTML($container, type);
        let nodeModel = nodeFactory.createNodeModel($node, this.canvasModel, positionX, positionY);
        nodeFactory.buildNodeBody(nodeModel, this);

        if (canBeActivated(nodeModel)) {
            this.addPort(nodeModel, portsTypes.actionInput, "activation");
        }

        if (canBeRenamed(nodeModel)) {
            this.addPort(nodeModel, portsTypes.actionInput, "rename");
        }

        if (isDraggable) {
            this.canvasEventsHandler.addItem(nodeModel);
        }

        const {itemId: nodeId} = this.decorateDiagramItem($node);
        nodeModel.setId(nodeId);
        this.canvasModel.addItem(nodeId, nodeModel);

        nodeModel.events.add("node-removed", (data:any)=>{
            console.log("ON REMOVE UN TRUC", data);
            console.log("ON REMOVE UN TRUC NE PAS OUBLIER DE REMOVE LES PORTS", data);
            this.canvasModel.removeItem(data.nodeModel.getId());
        })

        return nodeModel;
    }

    addLink(startPortModel: PortModel, endPortModel: PortModel, type = "default"): void {
        let linkFactory = this.itemsFactories.getLinkFactory(type);

        let $link = linkFactory.createLinkHTML(this.$linkLayer);
        let linkModel = linkFactory.createLinkModel($link, startPortModel, endPortModel);

        const {itemId: linkID} = this.decorateDiagramItem($link);
        linkModel.setId(linkID);

        this.canvasEventsHandler.addItem(linkModel);

        startPortModel.addLink(linkModel);
        endPortModel.addLink(linkModel);
    }

    removeLink(linkModel: LinkModel): void {
        linkModel.startPort.removeLink(linkModel);
        linkModel.endPort.removeLink(linkModel);
        this.canvasEventsHandler.removeItem(linkModel);
        linkModel.getHTMLElement().remove();
    }

    addPort(nodeModel: NodeModel, portType: string, portName: string = ""): PortModel {
        let $portContainer = nodeModel
            .getHTMLElement()
            .querySelector(`:scope > .port-container--${portType}`) as HTMLElement;

        let $port = this.createPort($portContainer, portType, portName);

        let portModel = new PortModel($port, portType, nodeModel, this.canvasModel);
        const {itemId: portID} = this.decorateDiagramItem($port);

        this.canvasEventsHandler.addItem(portModel);
        portModel.setId(portID);
        nodeModel.addPort(portModel);
        return portModel;
    }

    /**
     * @return {HTMLDivElement}
     */
    createCanvas(): HTMLDivElement {
        let $canvas = document.createElement('div');
        $canvas.classList.add("canvas-engine");

        return $canvas;
    }

    /**
     * @return {HTMLDivElement}
     */
    createNodeLayer(): HTMLDivElement {
        let $nodeLayer = document.createElement('div');
        $nodeLayer.classList.add("node-layer");
        return $nodeLayer;
    }

    /**
     * @return {SVGSVGElement}
     */
    createLinkLayer(): SVGSVGElement {
        let $linkLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        $linkLayer.classList.add("link-layer");
        return $linkLayer;
    }

    createLink(type = "default"): SVGElement {
        return this.itemsFactories.getLinkFactory(type).createLinkHTML(this.$linkLayer);
    }

    /**
     * @return {HTMLDivElement}
     */
    createPort($node: HTMLElement, portType: string, portName: string = ""): HTMLDivElement {
        let $port = document.createElement("div");
        $port.classList.add("port");
        $port.classList.add(`port-${portType}`);

        if (portType === portsTypes.actionInput || portType === portsTypes.actionOutput) {
            let $portTitle = this.portNameAdapter.createPortNameHtml(portName);
            $port.appendChild($portTitle);
        }

        let $innerPort = document.createElement("div");

        $innerPort.classList.add("port__inner");
        $port.appendChild($innerPort);
        $node.appendChild($port);

        return $port;
    }

    setPortNameAdapter(portNameAdapter: PortNameAdapter): void {
        this.portNameAdapter = portNameAdapter;
    }

    getContextMenu(): ContextMenuManager {
        return this.contextMenuManager;
    }
}
