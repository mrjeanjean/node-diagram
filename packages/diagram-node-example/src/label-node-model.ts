import {CanvasModel, NodeModel} from "canvas-core";

export class LabelNodeModel extends NodeModel{
    constructor($diagramItem: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number) {
        super($diagramItem, canvasModel, positionX, positionY);
        console.log("jhdksjdksjlds", $diagramItem.querySelector("input"));
        $diagramItem.querySelector("input")?.addEventListener("input", (e: Event)=>{
            console.log(e)
        })
    }
}
