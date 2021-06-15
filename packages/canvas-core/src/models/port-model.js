import {portsTypes} from "..";

export class PortModel {
    $port;
    portType;
    itemId;
    node;
    links = [];

    constructor($port, portType, nodeModel) {
        this.$port = $port;
        this.portType = portType;
        this.node = nodeModel;

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
        let {x, y} = this.node.getPosition();

        return {
            x: x + this.$port.offsetLeft,
            y: y + this.$port.offsetTop,
        };
    }

    getPortType(){
        return this.portType;
    }

    addLink(link) {
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
        if(linkModel.startPort.getPortType() === portsTypes.input){
            return this.portType === portsTypes.output;
        }

        if(linkModel.startPort.getPortType() === portsTypes.output){
            return this.portType === portsTypes.input;
        }
        return false;
    }
}
