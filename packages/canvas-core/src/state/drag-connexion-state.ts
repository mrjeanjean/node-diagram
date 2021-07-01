import {PortModel} from "../models/port-model";
import {CanvasModel} from "../models/canvas-model";
import {DragStateInterface} from "./drag-state-interface";
import {PlaceholderLinkModel} from "../connexion/placeholder-link-model";

export class DragConnexionState implements DragStateInterface {
    portOrigin: PortModel;
    portTarget: PortModel | null = null;
    placeHolderLinkModel: PlaceholderLinkModel;
    canvasModel: CanvasModel;

    constructor(portOrigin: PortModel, canvasModel: CanvasModel) {
        this.canvasModel = canvasModel;
        this.portOrigin = portOrigin;

        const $link = this.canvasModel.getCanvasEngine().createLink();

        this.placeHolderLinkModel = new PlaceholderLinkModel($link, portOrigin, "#666");
    }

    startDrag(data: any) {
    }

    onDrag(data: any) {
        let computedPosition = this.canvasModel.getRelativePosition(data.event.clientX, data.event.clientY);

        if (this.portTarget && this.portTarget.accept(this.portOrigin)) {
            computedPosition = this.portTarget.getPosition();
        }

        if (!computedPosition) return;

        this.placeHolderLinkModel.update(computedPosition);
    }

    endDrag() {
        this.placeHolderLinkModel.getHTMLElement().remove();

        if (!this.portTarget || !this.portTarget.accept(this.portOrigin)) return;

        if (this.portOrigin.isInputPort()) {
            this.canvasModel.getCanvasEngine().addLink(this.portTarget, this.portOrigin);
        } else {
            this.canvasModel.getCanvasEngine().addLink(this.portOrigin, this.portTarget);
        }
    }

    onHover(item: PortModel) {
        if (item !== this.portOrigin) {
            this.portTarget = item;
        } else {
            this.portTarget = null;
        }
    }
}
