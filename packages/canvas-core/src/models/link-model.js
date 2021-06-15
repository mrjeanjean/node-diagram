import {generateRandomColor} from "../helpers";

export class LinkModel{
    startPort;
    endPort;
    $link;
    linkId;
    lineColor;

    constructor($link, startPort, endPort) {
        this.$link = $link;
        this.startPort = startPort;
        this.endPort = endPort;
        this.lineColor = generateRandomColor();

        this.draw();
    }

    draw(){
        const startPortPosition = this.startPort.getPosition();
        const endPortPosition = this.endPort.getPosition();

        this.$link.setAttribute('x1', startPortPosition.x );
        this.$link.setAttribute('y1', startPortPosition.y);
        this.$link.setAttribute('x2', endPortPosition.x);
        this.$link.setAttribute('y2', endPortPosition.y);
        this.$link.setAttribute('stroke', this.lineColor);
        this.$link.setAttribute('stroke-width', "5");
    }

    setId(linkId){
        this.linkId = linkId;
    }

    getId(){
        return this.linkId;
    }
}
