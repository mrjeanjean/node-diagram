import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    portsTypes,
} from "canvas-core";
import {StartGameModel} from "./start-game-model";

export class StartGameFactory extends AbstractNodeFactory {
    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): StartGameModel {
        return new StartGameModel($node, canvasModel, positionX, positionY);
    }

    buildNodeBody(nodeModel: StartGameModel, canvasEngine: CanvasEngine) {
        nodeModel.setHTMLTitle("Start game");
        canvasEngine.addPort(nodeModel, portsTypes.output);
    }
}
