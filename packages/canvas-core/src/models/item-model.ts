export class ItemModel {
    $diagramItem: HTMLElement | SVGElement
    itemId: string | null = null;

    constructor($diagramItem: HTMLElement | SVGElement) {
        this.$diagramItem = $diagramItem;
    }

    getHTMLElement(): HTMLElement | SVGElement {
        return this.$diagramItem;
    }

    setId(id: string): void {
        this.itemId = id;
    }

    getId(): string | null {
        return this.itemId;
    }
}
