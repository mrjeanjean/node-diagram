import {diagramInfos} from "../diagram-infos";
import {LayerModel} from "./layer-model";
import {CanvasEngine} from "canvas-core";
import {Point} from "../types";
import {ItemModel} from "./item-model";

export class CanvasModel {
    layers: Map<string, LayerModel> = new Map();
    diagramItems: Map<string, ItemModel> = new Map();
    zoom: number = 1;
    $canvas: HTMLElement;
    canvasEngine: CanvasEngine;

    constructor($canvas: HTMLElement, canvasEngine: CanvasEngine) {
        this.$canvas = $canvas;
        this.canvasEngine = canvasEngine;
    }

    getCanvasEngine(): CanvasEngine {
        return this.canvasEngine;
    }

    getLayers(): Array<LayerModel> {
        return Array.from(this.layers.values());
    }

    getZoom(): number {
        return this.zoom;
    }

    setZoom(zoom: number): void {
        this.zoom = zoom;
        this.updateZoom();
    }

    setPosition():void{

    }

    updateZoom(): void {
        this.layers.forEach(layer => {
            const $layer = layer.getHTMLElement();
            $layer.style.transform = `scale(${this.zoom})`
        });

        diagramInfos.updateData(this);
    }

    addLayer(layerName: string, layerModel: LayerModel): void {
        this.layers.set(layerName, layerModel);
    }

    getLayer(layerName: string): LayerModel | undefined {
        return this.layers.get(layerName);
    }

    addItem(itemId: string, itemModel: ItemModel): void {
        this.diagramItems.set(itemId, itemModel);
    }

    getHTMLElement(): HTMLElement {
        return this.$canvas;
    }

    getRelativePosition(x: number, y: number, layerName: string = "node-layer"): Point {
        let linkLayer = this.getLayer(layerName);

        if (!linkLayer) {
            throw new Error(`Layer with name '${layerName}' is not defined`);
        }

        let linkLayerRealX = linkLayer.getHTMLElement().getBoundingClientRect().x;
        let linkLayerRealY = linkLayer.getHTMLElement().getBoundingClientRect().y;

        return {
            x: (x / this.getZoom() - linkLayerRealX / this.getZoom()),
            y: (y / this.getZoom() - linkLayerRealY / this.getZoom())
        }
    }

    getPosition(layerName: string = "node-layer"):Point{
        let linkLayer = this.getLayer(layerName);

        if (!linkLayer) {
            throw new Error(`Layer with name '${layerName}' is not defined`);
        }

        return linkLayer.getPosition();
    }
}
