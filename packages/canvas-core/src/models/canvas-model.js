export class CanvasModel{
    layers = [];
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

    getHTMLElement(){
        return this.$canvas;
    }

    serialize(){
        return {
            type: "canvas",
            zoom: this.zoom
        }
    }
}
