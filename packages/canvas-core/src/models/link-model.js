import {generateRandomColor} from "../helpers";

export class LinkModel{
    startPort;
    endPort;
    $link;
    linkId;
    lineColor;

    constructor($link, startPort, endPort, color = null) {
        this.$link = $link;
        this.startPort = startPort;
        this.endPort = endPort;
        this.lineColor = color ?? generateRandomColor();

        this.draw();
    }

    getCurvedPath(points, curvature = 0.4) {
        const [x1, y1, x2, y2] = points;
        const hx1 = x1 + Math.abs(x2 - x1) * curvature;
        const hx2 = x2 - Math.abs(x2 - x1) * curvature;

        return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
    }

    draw(){
        const startPortPosition = this.startPort.getPosition();
        const endPortPosition = this.endPort.getPosition();

        const path = this.getCurvedPath([
            startPortPosition.x,
            startPortPosition.y,
            endPortPosition.x,
            endPortPosition.y
        ])

        this.$link.setAttribute('x1', startPortPosition.x );
        this.$link.setAttribute('y1', startPortPosition.y);
        this.$link.setAttribute('x2', endPortPosition.x);
        this.$link.setAttribute('y2', endPortPosition.y);
        this.$link.setAttribute('stroke', this.lineColor);
        this.$link.setAttribute('stroke-width', "5");
        this.$link.setAttribute('stroke-linecap', "round");

        /*this.$link.setAttribute('d', path );
        this.$link.setAttribute('stroke', this.lineColor);
        this.$link.setAttribute('stroke-width', "5");*/
    }

    setId(linkId){
        this.linkId = linkId;
    }

    getId(){
        return this.linkId;
    }

    getHTMLElement(){
        return this.$link;
    }
}
