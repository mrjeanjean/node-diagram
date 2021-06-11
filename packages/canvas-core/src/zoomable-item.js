import {clamp} from "./helpers";

export class ZoomableItem{
    zoom = 1;
    model;

    constructor(model){
        this.model = model;
        this.attachEvents();
    }

    onMouseWheel = (e)=>{
        this.zoom += (e.deltaY * -1) / 800;
        this.zoom = clamp(this.zoom, 0.1, 4);

        this.model.setZoom(this.zoom);
    }

    attachEvents(){
        this.model.getHTMLElement().addEventListener("wheel", this.onMouseWheel);
    }

    getZoom(){
        return this.zoom;
    }

    static makeZoomable(model){
        return new ZoomableItem(model);
    }
}
