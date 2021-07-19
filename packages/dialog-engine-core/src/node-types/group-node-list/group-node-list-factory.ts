import {
    CanvasEngine,
    CanvasModel, contextTypes,
    createGroupNodeActions, createGroupNodeFilters,
    GroupNodeFactory,
    portsTypes
} from "canvas-core";
import {GroupNodeListModel} from "./group-node-list-model";

export class GroupNodeListFactory extends GroupNodeFactory {
    createNodeModel(
        $node: HTMLElement,
        canvasModel: CanvasModel,
        positionX: number,
        positionY: number
    ): GroupNodeListModel {
        return new GroupNodeListModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: GroupNodeListModel, canvasEngine: CanvasEngine) {
        createGroupNodeActions(nodeModel, canvasEngine, contextTypes.group);
        createGroupNodeFilters(nodeModel, canvasEngine);

        canvasEngine.addPort(nodeModel, portsTypes.output);
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }

    getMenuItemName(): string {
        return "Group node";
    }

    getMenuGroup(): string {
        return "";
    }
}
