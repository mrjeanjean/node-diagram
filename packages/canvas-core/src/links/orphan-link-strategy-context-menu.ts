import {OrphanLinkInterface} from "./orphan-link-interface";
import {PortModel} from "../models/port-model";
import {PlaceholderLinkModel} from "../connexion/placeholder-link-model";
import {CanvasModel, NodeFactory} from "canvas-core";
import {ContextMenu} from "../context-menu/context-menu";

export class OrphanLinkStrategyContextMenu implements OrphanLinkInterface {
    canvasModel: CanvasModel;

    constructor(canvasModel: CanvasModel) {
        this.canvasModel = canvasModel;
    }

    handleOrphanLink(portOrigin: PortModel, placeholderLink: PlaceholderLinkModel): void {
        const targetPosition = placeholderLink.getEndPosition();
        targetPosition.x =  targetPosition.x - 100;

        const contextMenu = new ContextMenu(
            targetPosition,
            {
                onItemSelect: (data) => {
                    placeholderLink.getHTMLElement().remove();
                    const node = this.canvasModel.getCanvasEngine().addNode(
                        targetPosition.x,
                        targetPosition.y,
                        data.nodeName
                    )

                    const inputPort = node.getInputPort();
                    if(inputPort){
                        this.canvasModel.getCanvasEngine().addLink(portOrigin, inputPort);
                    }
                }
            });
        contextMenu.addItemsFilter((itemsList: Map<string, NodeFactory>, context: string)=>{
            const itemsFiltered = new Map<string, NodeFactory>(itemsList);
            itemsFiltered.forEach((nodeFactory:NodeFactory, nodeName:string)=>{
                if(nodeName === "start-game"){
                    itemsFiltered.delete(nodeName);
                }
            });

            return itemsFiltered;
        });
        this.canvasModel.getCanvasEngine().getContextMenu().show(contextMenu);
    }
}
