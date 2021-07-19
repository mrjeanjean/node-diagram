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
        let targetPosition = placeholderLink.getEndPosition();
        let contextMenuPosition = this.canvasModel.getAbsolutePosition(
            targetPosition.x,
            targetPosition.y,
            -125
        );

        const contextMenu = new ContextMenu(contextMenuPosition);
        contextMenu.events.add("node-select", (data: any) => {
            placeholderLink.getHTMLElement().remove();
            const node = this.canvasModel.getCanvasEngine().addNode(
                targetPosition.x - 125,
                targetPosition.y,
                data.nodeName
            )

            const inputPort = node.getInputPort();
            if (inputPort) {
                this.canvasModel.getCanvasEngine().addLink(portOrigin, inputPort);
            }
        })

        contextMenu.events.add("context-menu-close", () => {
            placeholderLink.getHTMLElement().remove();
        });

        contextMenu.addItemsFilter((itemsList: Map<string, NodeFactory>, context: string) => {
            const itemsFiltered = new Map<string, NodeFactory>(itemsList);
            itemsFiltered.forEach((nodeFactory: NodeFactory, nodeName: string) => {
                if (nodeName === "start-game") {
                    itemsFiltered.delete(nodeName);
                }
            });

            return itemsFiltered;
        });


        this.canvasModel.getCanvasEngine().getContextMenu().show(contextMenu);
    }
}
