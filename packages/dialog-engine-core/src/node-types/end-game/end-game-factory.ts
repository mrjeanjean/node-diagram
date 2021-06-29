import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    portsTypes,
} from "canvas-core";
import {EndGameModel} from "./end-game-model";

export class EndGameFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): EndGameModel {
        return new EndGameModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: EndGameModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("End game");
        canvasEngine.addPort(nodeModel, portsTypes.input);
    }
}
