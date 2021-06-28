import {GroupNodeModel} from "canvas-core";

export const createGroupNodeActions = (groupNodeModel:GroupNodeModel, onAddButtonClicked: Function) => {
    const $listButtons = document.createElement("div");
    $listButtons.classList.add("node-list-buttons");

    const $addButton = document.createElement("button");
    $addButton.classList.add("button-add-item");
    $addButton.innerHTML = "+";

    $listButtons.addEventListener("mousedown", (e)=>{
        e.stopPropagation();
    })

    $addButton.addEventListener("click", ()=>{
        onAddButtonClicked();
    });

    $listButtons.appendChild($addButton);
    groupNodeModel.getHTMLElement().appendChild($listButtons);

    return $listButtons;
}
