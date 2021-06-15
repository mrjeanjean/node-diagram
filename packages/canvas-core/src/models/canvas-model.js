import {diagramInfos} from "../diagram-infos";

export class CanvasModel {
    layers = new Map();
    diagramItems = new Map();
    zoom = 1;
    $canvas;
    canvasEngine;

    constructor($canvas, canvasEngine) {
        this.$canvas = $canvas;
        this.canvasEngine = canvasEngine;
    }

    getCanvasEngine(){
        return this.canvasEngine;
    }

    getZoom() {
        return this.zoom;
    }

    setZoom(zoom) {
        this.zoom = zoom;
        this.updateZoom();
    }

    updateZoom(){
        this.layers.forEach(layer => {
            const $layer = layer.getHTMLElement();
            $layer.style.transform = `scale(${this.zoom})`
        });

        diagramInfos.updateData(this);
    }

    addLayer(layerName, layerModel) {
        this.layers.set(layerName, layerModel);
    }

    getLayer(layerName){
        return this.layers.get(layerName);
    }

    addItem(itemID, itemModel) {
        this.diagramItems.set(itemID, itemModel);
    }

    getModelFromElement($element) {
        return this.diagramItems.get($element.dataset.diagramItemId);
    }

    getModelFromId(id) {
        return this.diagramItems.get(id);
    }

    getHTMLElement() {
        return this.$canvas;
    }

    onDrag(data) {
        this.layers.forEach(layerModel => {
            layerModel.onDrag(data);
        })
    }

    endDrag(data) {
        this.layers.forEach(layerModel => {
            layerModel.endDrag(data);
        })
    }
}
