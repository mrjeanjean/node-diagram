import {EventDispatcher} from "./utils/event-dispatcher";

export class DraggableItem {
    isDragging: boolean = false;
    initialX: number = 0;
    initialY: number = 0;

    currentPositionX: number = 0;
    currentPositionY: number = 0;

    $item: HTMLElement;
    events: EventDispatcher

    constructor($item: HTMLElement) {
        this.$item = $item;
        this.events = new EventDispatcher();

        this.startDrag = this.startDrag.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);

        this.attachEvents();
    }

    startDrag(event: MouseEvent): void {
        if (event.button !== 0) {
            return;
        }

        this.initialX = event.clientX;
        this.initialY = event.clientY;

        this.events.fire('startDrag', {
            initialX: this.initialX,
            initialY: this.initialY,
        })

        this.isDragging = true;
    }

    onDrag(event: MouseEvent): void {
        if (this.isDragging) {
            this.currentPositionX = event.clientX - this.initialX;
            this.currentPositionY = event.clientY - this.initialY;

            this.events.fire("onDrag", {
                initialX: this.initialX,
                initialY: this.initialY,
                currentPositionX: this.currentPositionX,
                currentPositionY: this.currentPositionY,
                event: event
            })
        }
    }

    endDrag(event: MouseEvent): void {
        if (this.isDragging) {
            this.isDragging = false;
            this.events.fire('endDrag', {
                currentPositionX: this.currentPositionX,
                currentPositionY: this.currentPositionY,
                event: event
            })
        }
    }

    attachEvents(): void {
        this.$item.addEventListener("mousedown", this.startDrag);
        document.addEventListener("mouseup", this.endDrag);
        document.addEventListener("mousemove", this.onDrag);
    }

    static makeDraggable($item: HTMLElement): DraggableItem {
        return new DraggableItem($item);
    }
}
