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

    addLink(link) {
        this.links.push(link);
    }

    updateLinks(){
        this.links.forEach(link=>{
            link.draw();
        })
    }

    getHTMLElement(){
        return this.$port;
    }
}
