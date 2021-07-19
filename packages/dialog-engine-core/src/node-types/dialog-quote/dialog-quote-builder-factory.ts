import {
    AbstractNodeFactory,
    CanvasEngine,
    CanvasModel,
    contextTypes,
    getRandomThemeColor
} from "canvas-core";
import {DialogQuoteModel} from "./dialog-quote-model";
import {DialogQuoteFactory} from "./dialog-quote-factory";

export class DialogQuoteBuilderFactory extends AbstractNodeFactory {
    private readonly characterName: string;
    private dialogQuoteFactory: DialogQuoteFactory;
    private color: string;

    constructor(characterName: string, color?: string) {
        super();
        this.characterName = characterName;
        this.color = getRandomThemeColor();
        this.dialogQuoteFactory = new DialogQuoteFactory();
    }

    createNodeHTML($container: HTMLElement, type: string): HTMLElement {
        const $node = super.createNodeHTML($container, type);
        $node.style.borderColor = this.color;
        const $nodeHeader = $node.querySelector(".node__title") as HTMLElement;
        if ($nodeHeader) {
            $nodeHeader.style.backgroundColor = this.color;
        }
        return $node;
    }

    buildNodeBody(nodeModel: DialogQuoteModel, canvasEngine: CanvasEngine): void {
        return this.dialogQuoteFactory.buildNodeBody(nodeModel, canvasEngine);
    }

    createNodeModel($node: HTMLElement, canvasModel: CanvasModel, positionX: number, positionY: number): DialogQuoteModel {
        const dialogQuoteModel = new DialogQuoteModel($node, canvasModel, positionX, positionY);
        dialogQuoteModel.setData("character", this.characterName);
        return dialogQuoteModel;
    }

    displayOnContextMenu(context: string): boolean {
        return context === contextTypes.main
            || context === contextTypes.group
            || this.getMenuItemName() === "Heros";
    }

    getMenuItemName(): string {
        return this.characterName;
    }

    getMenuGroup(): string {
        return "dialog";
    }

    editMenuItemHTML($menuItem: HTMLElement): HTMLElement {
        $menuItem.style.color = this.color;
        return $menuItem;
    }
}
