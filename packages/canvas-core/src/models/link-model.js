import {generateRandomColor} from "../helpers";

export class LinkModel{
    startNode;
    endNode;
    $link;
    linkId;
    lineColor;

    constructor($link, startNode, endNode) {
        this.$link = $link;
        this.startNode = startNode;
        this.endNode = endNode;
        this.lineColor = generateRandomColor();

        this.draw();
    }

    draw(){
        const startNodePosition = this.startNode.getPosition();
        const endNodePosition = this.endNode.getPosition();

        this.$link.setAttribute('x1', startNodePosition.x + 100);
        this.$link.setAttribute('y1', startNodePosition.y + 75);
        this.$link.setAttribute('x2', endNodePosition.x + 100);
        this.$link.setAttribute('y2', endNodePosition.y + 75);
        this.$link.setAttribute('stroke', this.lineColor);
        this.$link.setAttribute('stroke-width', "4");
    }

    setId(linkId){
        this.linkId = linkId;
    }

    getId(){
        return this.linkId;
    }
}
