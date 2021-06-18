import {CanvasModel} from "./models/canvas-model";

class DiagramInfos{
    $diagramInfos: HTMLElement;

    constructor(){
        this.$diagramInfos = document.querySelector("#diagram-infos") as HTMLElement;
    }

    updateData(canvasModel: CanvasModel): void{
        this.$diagramInfos.innerHTML = `
            <div>Zoom: ${Math.floor(canvasModel.getZoom() * 100)}%</div> 
        `;
    }
}

export const diagramInfos = new DiagramInfos();
