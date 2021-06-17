import {portsTypes} from "..";

export class PortModel {
    $port;
    portType;
    itemId;
    node;
    links = [];
    canvasModel;

    constructor($port, portType, nodeModel, canvasModel) {
        this.$port = $port;
        this.portType = portType;
        this.node = nodeModel;
        this.canvasModel = canvasModel;

        this.updateLinks = this.updateLinks.bind(this);

        this.node.events.add('node_update', this.updateLinks);
    }

    setId(id) {
        this.itemId = id;
    }

    getId() {
        return this.itemId;
    }

    getPosition() {
        let portReal = this.getHTMLElement().getBoundingClientRect();
        let portRealX = portReal.x + portReal.width / 2;
        let portRealY = portReal.y + portReal.height / 2;

        return this.canvasModel.getRelativePosition(portRealX, portRealY);
    }

    getPortType(){
        return this.portType;
    }

    addLink(link) {
        this.getHTMLElement().classList.add("connected");
        this.links.push(link);
    }

    removeLink(link) {
        this.links = this.links.filter(linkModel => {
            return link.getId() !== linkModel.getId()
        });
    }

    updateLinks() {
        this.links.forEach(link => {
            link.draw();
        })
    }

    getHTMLElement() {
        return this.$port;
    }

    accept(linkModel){
        if(this.isAlreadyConnectedTo(linkModel)){
            return false;
        }

        if(linkModel.startPort.isInputPort()){
            return !this.isInputPort();
        }

        if(!linkModel.startPort.isInputPort()){
            return this.isInputPort();
        }

        return false;
    }

    isAlreadyConnectedTo(linkModel) {
        return this.links.find(
            link=>link.startPort.getId() === linkModel.startPort.getId()
        ) !== undefined;
    }

    isInputPort(){
        return this.getPortType() === portsTypes.actionInput ||
        this.getPortType() === portsTypes.input
    }

    isActionType(){
        return this.getPortType().startsWith('action');
    }
}
