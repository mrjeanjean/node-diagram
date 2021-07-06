import {generateCurvedPath} from "../utils/helpers";
import {LinkInterface} from "../interfaces/link-interface";
import {PortModel} from "./port-model";
import {ItemModel} from "./item-model";
import {EventDispatcher} from "../utils/event-dispatcher";

export class LinkModel extends ItemModel implements LinkInterface{
    startPort: PortModel;
    endPort: PortModel;
    $link: SVGElement;
    events: EventDispatcher;

    constructor($link: SVGElement, startPort: PortModel, endPort: PortModel, color: string|null = null) {

        super($link);

        this.$link = $link;
        this.startPort = startPort;
        this.endPort = endPort;
        this.events = new EventDispatcher();

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

    remove(){
        this.startPort.removeLink(this);
        this.endPort.removeLink(this);

        this.events.fire("link-removed", {
            linkModel: this
        });
        this.getHTMLElement().remove();
    }
}
