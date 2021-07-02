import {CanvasEngine, GroupNodeModel} from "canvas-core";
import {ContextMenu} from "../context-menu/context-menu";

export const createGroupNodeActions = (
    groupNodeModel: GroupNodeModel,
    canvasEngine: CanvasEngine,
    context: string | null
) => {
    const $listButtons = document.createElement("div");
    $listButtons.classList.add("node-list-buttons");

    const $addButton = document.createElement("button");
    $addButton.classList.add("button-add-item");
    $addButton.innerHTML = "+";

    $listButtons.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    })

    $addButton.addEventListener("click", () => {
        let contextMenuPosition = canvasEngine.canvasModel.getNodeAbsolutePosition(groupNodeModel);
        let nodeWidth = canvasEngine.canvasModel.getNodeSize(groupNodeModel);
        contextMenuPosition.x += nodeWidth.width;

        let contextMenu = new ContextMenu(
            contextMenuPosition,
            {
                onItemSelect: (data) => {
                    groupNodeModel.addNode(data.nodeName)
                },
                context
            });
        canvasEngine.getContextMenu().show(contextMenu);
    });

    $listButtons.appendChild($addButton);
    groupNodeModel.getHTMLElement().appendChild($listButtons);

    return $listButtons;
}
