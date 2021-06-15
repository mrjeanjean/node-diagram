import {LinkModel} from "../models/link-model";
import {DefaultState} from "./default-state";

class MouseHelper {
    positionX;
    positionY;

    constructor({x, y}) {
        this.setPosition(x, y);
        console.log(x, y);
    }

    getPosition() {
        return {
            x: this.positionX,
            y: this.positionY,
        }
    }

    setPosition(x, y) {
        this.positionX = x;
        this.positionY = y;
    }
}

export class ConnectState extends DefaultState {
    mouseHelper;
    portTarget;

    constructor(currentDiagramItem, canvasModel) {
        super(currentDiagramItem, canvasModel);

        this.mouseHelper = new MouseHelper(this.currentDiagramItem.getPosition());

        const $link = this.createLink();
        this.canvasModel.getLayer("link-layer").getHTMLElement().appendChild($link);
        this.linkModel = new LinkModel($link, currentDiagramItem, this.mouseHelper, "#666");
    }

    onDrag(data) {
        let linkLayer = this.canvasModel.getLayer("link-layer");
        let linkLayerRealX = linkLayer.getHTMLElement().getBoundingClientRect().x;
        let linkLayerRealY = linkLayer.getHTMLElement().getBoundingClientRect().y;

        let computedPosition = {
            x: (data.event.clientX / this.canvasModel.getZoom() - linkLayerRealX / this.canvasModel.getZoom()),
            y: (data.event.clientY / this.canvasModel.getZoom() - linkLayerRealY / this.canvasModel.getZoom())
        }

        if(this.portTarget){
            computedPosition = this.portTarget.getPosition();
        }

        this.mouseHelper.setPosition(
            computedPosition.x,
            computedPosition.y
        );

        this.linkModel.draw();
    }

    endDrag() {
        this.linkModel.getHTMLElement().remove();

        if(this.portTarget){
            this.canvasModel.getCanvasEngine().addLink(this.currentDiagramItem, this.portTarget);
        }
    }

    createLink() {
        let $linkLayer = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        $linkLayer.classList.add("link-layer");
        return $linkLayer;
    }

    onHover(item) {
        if (item !== this.currentDiagramItem) {
            this.portTarget = item;
        } else {
            this.portTarget = null;
        }
    }
}
