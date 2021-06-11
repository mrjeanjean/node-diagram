export class CanvasModel{
    layers = [];
    diagramItems = new Map();
    zoom = 1;
    $canvas;

    constructor($canvas){
        this.$canvas = $canvas;
    }

    getZoom(){
        return this.zoom;
    }

    setZoom(zoom){
        this.zoom = zoom;
        this.layers.forEach($layer=>{
            $layer.style.transform = `scale(${this.zoom})`
        })
    }

    addLayer($layer){
        this.layers.push($layer);
    }

    addItem(itemID, model){
        this.diagramItems.set(itemID, model);
    }

    getModelFromElement($element) {
        return this.diagramItems.get($element.dataset.diagramItemId);
    }

    getHTMLElement(){
        return this.$canvas;
    }

    onDrag(data){
        this.layers.forEach($layer=>{
            const layerModel = this.getModelFromElement($layer);
            layerModel.onDrag(data);
        })
    }

    endDrag(data){
        this.layers.forEach($layer=>{
            const layerModel = this.getModelFromElement($layer);
            layerModel.endDrag(data);
        })
    }
}
