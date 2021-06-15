class DiagramInfos{
    $diagramInfos;

    constructor(){
        this.$diagramInfos = document.querySelector("#diagram-infos");
    }

    updateData(canvasModel){
        this.$diagramInfos.innerHTML = `
            <div>Zoom: ${Math.floor(canvasModel.getZoom() * 100)}%</div> 
        `;
    }
}

export const diagramInfos = new DiagramInfos();
