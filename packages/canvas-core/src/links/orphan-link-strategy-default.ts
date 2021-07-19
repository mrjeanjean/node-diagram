import {OrphanLinkInterface} from "./orphan-link-interface";
import {PortModel} from "../models/port-model";
import {PlaceholderLinkModel} from "../connexion/placeholder-link-model";
import {CanvasModel} from "canvas-core";

export class OrphanLinkStrategyDefault implements OrphanLinkInterface{
    canvasModel: CanvasModel;

    constructor(canvasModel: CanvasModel) {
        this.canvasModel = canvasModel;
    }

    handleOrphanLink(portOrigin: PortModel, placeholderLink:PlaceholderLinkModel): void {
        placeholderLink.getHTMLElement().remove();
    }
}
