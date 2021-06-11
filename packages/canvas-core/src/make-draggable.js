export const makeDraggable = ($element, dragStartCallback, onDragCallback, dragEndCallback) => {
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;

    let currentPositionX = 0;
    let currentPositionY = 0;

    const startDrag = (e) => {
        if(e.button !== 0){
            return;
        }

        initialX = e.clientX;
        initialY = e.clientY;

        dragStartCallback({
            initialX,
            initialY,
        })

        isDragging = true;
        e.stopPropagation();
    }

    const onDrag = (e) => {
        if (isDragging) {
            currentPositionX = e.clientX - initialX;
            currentPositionY = e.clientY - initialY;

            onDragCallback({
                initialX,
                initialY,
                currentPositionX,
                currentPositionY
            })
        }
    }

    const endDrag = () => {
        if(isDragging){
            isDragging = false;
            dragEndCallback({
                currentPositionX,
                currentPositionY,
            })
        }
    }

    $element.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", onDrag);
}

/*export const makeDraggable = ($element, $parent = null) => {
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;

    let currentPositionX = 0;
    let currentPositionY = 0;

    let elementX = $element.dataset.positionX ? parseFloat($element.dataset.positionX) : 0;
    let elementY = $element.dataset.positionY ? parseFloat($element.dataset.positionY) : 0;

    const startDrag = (e) => {
        initialX = e.clientX - elementX;
        initialY = e.clientY - elementY;

        isDragging = true;
        e.stopPropagation();
    }

    const onDrag = (e) => {
        currentPositionX = e.clientX - initialX;
        currentPositionY = e.clientY - initialY;

        if (isDragging) {
            //$element.style.transform = `translate(${currentPositionX}px, ${currentPositionY}px)`
            $element.style.top = `${currentPositionY}px`;
            $element.style.left = `${currentPositionX}px`;
        }
    }

    const endDrag = () => {
        if(isDragging){
            isDragging = false;
            elementX = currentPositionX;
            elementY = currentPositionY;
        }
    }

    if($parent){
        $parent.addEventListener("mousedown", startDrag);
    }else{
        $element.addEventListener("mousedown", startDrag);
    }
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", onDrag);
}*/
