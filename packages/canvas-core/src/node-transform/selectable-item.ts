
export class SelectableItem {
    private $item: HTMLElement | SVGElement;
    private isReadyToTrigger = false;
    private timeout: number | null = null;
    sensitivity: number;
    onSelect: Function;

    constructor($item: HTMLElement | SVGElement, onSelect:Function, sensitivity = 0.2) {
        this.$item = $item;
        this.sensitivity = sensitivity;
        this.onSelect = onSelect;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.$item.addEventListener("mousedown", this.handleMouseDown);
        this.$item.addEventListener("click", e => e.stopPropagation());
        this.$item.addEventListener("mouseup", this.handleSelect);
    }

    handleMouseDown(): void {
        this.isReadyToTrigger = true;

        this.timeout = window.setTimeout(() => {
            this.isReadyToTrigger = false;
            if(this.timeout){
                this.clearTimeout()
            }
        }, this.sensitivity * 1000);

    }

    handleSelect(event:Event): void {
        if (this.isReadyToTrigger) {
            this.onSelect();
            this.isReadyToTrigger = false;

            if (this.timeout) {
                this.clearTimeout()
            }
        }
    }

    clearTimeout():void{
        if(this.timeout){
            window.clearTimeout(this.timeout);
        }
        this.timeout = null;
    }

    static makeSelectable($item: HTMLElement | SVGElement, onSelect:Function, sensitivity = 0.2):SelectableItem{
        return new SelectableItem($item, onSelect, sensitivity);
    }

}
