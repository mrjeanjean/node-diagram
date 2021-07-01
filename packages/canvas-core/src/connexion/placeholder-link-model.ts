import {generateCurvedPath, generateRandomColor} from "../utils/helpers";
import {PortModel} from "../models/port-model";
import {Point} from "../types";

export class PlaceholderLinkModel {
    portOrigin: PortModel;
    $link: SVGElement;
    lineColor: string;
    endPosition: Point;

    constructor($link: SVGElement, portOrigin: PortModel, color: string | null = null) {
        this.$link = $link;
        this.portOrigin = portOrigin;
        this.lineColor = color ?? generateRandomColor();
        this.$link.classList.add("on-connection");
        this.endPosition = this.portOrigin.getPosition() ?? {x: 0, y: 0};

        this.draw();
    }

    update(point: Point) {
        this.endPosition = point;
        this.draw();
    }

    draw(): void {
        let path:string;
        if(this.portOrigin.isInputPort()){
            path = generateCurvedPath(this.endPosition, this.portOrigin.getPosition(), !this.portOrigin.isActionType());
        }else{
            path = generateCurvedPath(this.portOrigin.getPosition(), this.endPosition, !this.portOrigin.isActionType());
        }

        this.$link.querySelectorAll("path").forEach($path => {
            $path.setAttribute('d', path);
        });
    }

    getHTMLElement(): SVGElement {
        return this.$link;
    }
}
