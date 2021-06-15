class DiagramInfos{
    $diagramInfos;

    constructor(){
        this.$diagramInfos = document.querySelector("#diagram-infos");
    }

    updateData(canvasModel){
        this.$diagramInfos.innerHTML = `
            <div>Zoom: ${canvasModel.getZoom()}</div> 
        `;
    }
}

export const diagramInfos = new DiagramInfos();
