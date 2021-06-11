export class DraggableItem{
    isDragging = false;
    initialX = 0;
    initialY = 0;

    currentPositionX = 0;
    currentPositionY = 0;

    $item;
    dragStartCallback;
    onDragCallback;
    dragEndCallback;


    constructor($item, dragStartCallback, onDragCallback, dragEndCallback) {
        this.$item = $item;
        this.dragStartCallback = dragStartCallback;
        this.onDragCallback = onDragCallback;
        this.dragEndCallback = dragEndCallback;

        this.attachEvents();
    }

    startDrag = (e) => {
        if(e.button !== 0){
            return;
        }

        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.dragStartCallback({
            initialX: this.initialX,
            initialY: this.initialY,
        })

        this.isDragging = true;
        //e.stopPropagation();
    }

    onDrag = (e) => {
        if (this.isDragging) {
            this.currentPositionX = e.clientX - this.initialX;
            this.currentPositionY = e.clientY - this.initialY;

            this.onDragCallback({
                initialX: this.initialX,
                initialY: this.initialY,
                currentPositionX: this.currentPositionX,
                currentPositionY: this.currentPositionY
            })
        }
    }

    endDrag = () => {
        if(this.isDragging){
            this.isDragging = false;
            this.dragEndCallback({
                currentPositionX: this.currentPositionX,
                currentPositionY: this.currentPositionY,
            })
        }
    }

    attachEvents() {
        this.$item.addEventListener("mousedown", this.startDrag);
        document.addEventListener("mouseup", this.endDrag);
        document.addEventListener("mousemove", this.onDrag);
    }

    static makeDraggable($item, dragStartCallback, onDragCallback, dragEndCallback){
        return new DraggableItem($item, dragStartCallback, onDragCallback, dragEndCallback);
    }
}
