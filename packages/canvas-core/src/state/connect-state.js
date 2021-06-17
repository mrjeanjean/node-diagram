import {LinkModel} from "../models/link-model";
import {DefaultState} from "./default-state";

class MouseHelper {
    positionX;
    positionY;
    startedPort

    constructor(startedPort) {
        this.startedPort = startedPort;
        let startedPortPosition = startedPort.getPosition();
        this.setPosition(startedPortPosition.x, startedPortPosition.y);
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

    isActionType(){
        return this.startedPort.isActionType();
    }

    isInputPort(){
        return !this.startedPort.isInputPort();
    }
}

export class ConnectState extends DefaultState {
    mouseHelper;
    portTarget;

    constructor(currentDiagramItem, canvasModel) {
        super(currentDiagramItem, canvasModel);

        this.mouseHelper = new MouseHelper(this.currentDiagramItem);

        const $link = this.canvasModel.getCanvasEngine().createLink(this.canvasModel.getLayer("link-layer").getHTMLElement());
        $link.classList.add("on-connection");

        if (currentDiagramItem.isInputPort()) {
            this.linkModel = new LinkModel($link, this.mouseHelper, currentDiagramItem, "#666");
        } else {
            this.linkModel = new LinkModel($link, currentDiagramItem, this.mouseHelper, "#666");
        }
    }

    onDrag(data) {
        let computedPosition = this.canvasModel.getRelativePosition(data.event.clientX, data.event.clientY);

        if (this.portTarget && this.portTarget.accept(this.linkModel)) {
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

        if (this.portTarget) {
            if (this.portTarget.accept(this.linkModel)) {

                if (this.currentDiagramItem.isInputPort()) {
                    this.canvasModel.getCanvasEngine().addLink(this.portTarget, this.currentDiagramItem);
                } else {
                    this.canvasModel.getCanvasEngine().addLink(this.currentDiagramItem, this.portTarget);
                }
            }
        }
    }

    onHover(item) {
        if (item !== this.currentDiagramItem) {
            this.portTarget = item;
        } else {
            this.portTarget = null;
        }
    }
}
