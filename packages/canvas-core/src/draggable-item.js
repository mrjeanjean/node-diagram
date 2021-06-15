import {EventDispatcher} from "./event-dispatcher";

export class DraggableItem{
    isDragging = false;
    initialX = 0;
    initialY = 0;

    currentPositionX = 0;
    currentPositionY = 0;

    $item;
    events

    constructor($item) {
        this.$item = $item;
        this.events = new EventDispatcher();

        this.attachEvents();
    }

    startDrag = (e) => {
        if(e.button !== 0){
            return;
        }

        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.events.fire('startDrag', {
            initialX: this.initialX,
            initialY: this.initialY,
        })

        this.isDragging = true;
    }

    onDrag = (event) => {
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

    endDrag = (event) => {
        if(this.isDragging){
            this.isDragging = false;
            this.events.fire('endDrag', {
                currentPositionX: this.currentPositionX,
                currentPositionY: this.currentPositionY,
                event: event
            })
        }
    }

    attachEvents() {
        this.$item.addEventListener("mousedown", this.startDrag);
        document.addEventListener("mouseup", this.endDrag);
        document.addEventListener("mousemove", this.onDrag);
    }

    static makeDraggable($item){
        return new DraggableItem($item);
    }
}
