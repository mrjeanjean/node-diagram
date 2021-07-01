import {CanvasEngine, GroupNodeModel} from "canvas-core";

export const createGroupNodeActions = (
    groupNodeModel:GroupNodeModel,
    canvasEngine: CanvasEngine
) => {
    const $listButtons = document.createElement("div");
    $listButtons.classList.add("node-list-buttons");

    const $addButton = document.createElement("button");
    $addButton.classList.add("button-add-item");
    $addButton.innerHTML = "+";

    $listButtons.addEventListener("mousedown", (e)=>{
        e.stopPropagation();
    })

    $addButton.addEventListener("click", ()=>{
        canvasEngine.getContextMenu().show(groupNodeModel.getPosition(), (data:any)=>{
            groupNodeModel.addNode(data.nodeName)
        });
    });

    $listButtons.appendChild($addButton);
    groupNodeModel.getHTMLElement().appendChild($listButtons);

    return $listButtons;
}
