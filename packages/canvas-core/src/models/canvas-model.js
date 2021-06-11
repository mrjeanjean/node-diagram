export class CanvasModel {
    layers = [];
    diagramItems = new Map();
    zoom = 1;
    $canvas;

    constructor($canvas) {
        this.$canvas = $canvas;
    }

    getZoom() {
        return this.zoom;
    }

    setZoom(zoom) {
        this.zoom = zoom;
        this.layers.forEach(layer => {
            const $layer = layer.getHTMLElement();
            $layer.style.transform = `scale(${this.zoom})`
        })
    }

    addLayer(layerModel) {
        this.layers.push(layerModel);
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
