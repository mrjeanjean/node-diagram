import {NodeModel} from "./node-model";
import {LinkModel} from "./link-model";
import {CanvasModel} from "./canvas-model";
import {PortInterface} from "../interfaces/port-interface";
import {portsTypes} from "./../ports/ports-types";
import {Point} from "../types";

export class PortModel implements PortInterface {
    $port: HTMLElement;
    portType: string;
    itemId: string | null = null;
    node: NodeModel;
    links: Array<LinkModel> = [];
    data:any = {};
    canvasModel;
    constructor($port: HTMLElement,
                portType: string,
                nodeModel: NodeModel,
                canvasModel: CanvasModel
    ) {
        this.$port = $port;
        this.portType = portType;
        this.node = nodeModel;
        this.canvasModel = canvasModel;

        this.updateLinks = this.updateLinks.bind(this);

        this.node.events.add('node_update', this.updateLinks);
    }

    setId(id: string): void {
        this.itemId = id;
    }

    getId(): string | null {
        return this.itemId;
    }

    getPosition(): Point{
        let portReal = this.getHTMLElement().getBoundingClientRect();
        let portRealX = portReal.x + portReal.width / 2;
        let portRealY = portReal.y + portReal.height / 2;

        return this.canvasModel.getRelativePosition(portRealX, portRealY);
    }

    getPortType(): string {
        return this.portType;
    }

    remove(){
        this.getHTMLElement().remove();
    }

    addLink(link: LinkModel): void {
        this.getHTMLElement().classList.add("connected");
        this.links.push(link);
    }

    removeLink(link: LinkModel): void {
        this.links = this.links.filter(linkModel => {
            return link.getId() !== linkModel.getId()
        });

        if(this.links.length <= 0){
            this.getHTMLElement().classList.remove("connected");
        }
    }

    updateLinks(): void{
        this.links.forEach(link => {
            link.draw();
        });
    }

    getHTMLElement(): HTMLElement {
        return this.$port;
    }

    accept(portModelFrom: PortModel): boolean{
        if (this.isAlreadyConnectedTo(portModelFrom)) {
            return false;
        }

        if (portModelFrom.isInputPort()) {
            return !this.isInputPort();
        }

        if (!portModelFrom.isInputPort()) {
            return this.isInputPort();
        }

        return false;
    }

    isAlreadyConnectedTo(portModel: PortModel): boolean {
        return this.links.find(
            link => link.startPort.getId() === portModel.getId()
        ) !== undefined;
    }

    isInputPort(): boolean {
        return this.getPortType() === portsTypes.actionInput ||
            this.getPortType() === portsTypes.input
    }

    isActionType(): boolean {
        return this.getPortType().startsWith('action');
    }
}
