import {generateCurvedPath, generateRandomColor} from "../utils/helpers";
import {LinkInterface} from "../interfaces/link-interface";
import {PortModel} from "./port-model";
import {ItemModel} from "./item-model";

export class LinkModel extends ItemModel implements LinkInterface{
    startPort: PortModel;
    endPort: PortModel;
    $link: SVGElement;

    constructor($link: SVGElement, startPort: PortModel, endPort: PortModel, color: string|null = null) {

        super($link);

        this.$link = $link;
        this.startPort = startPort;
        this.endPort = endPort;

        this.draw();
    }

    draw(): void {
        const startPortPosition = this.startPort.getPosition();
        const endPortPosition = this.endPort.getPosition();

        if (!startPortPosition || !endPortPosition) {
            return;
        }

        const path = generateCurvedPath(startPortPosition, endPortPosition, !this.startPort.isActionType());

        this.$link.querySelectorAll("path").forEach($path => {
            $path.setAttribute('d', path);
        });
    }

    getStartPort(): PortModel {
        return this.endPort;
    }

    getEndPort(): PortModel {
        return this.endPort;
    }
}
