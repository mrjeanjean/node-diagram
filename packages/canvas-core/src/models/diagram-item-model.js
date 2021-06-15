export class DiagramItemModel{
    $diagramItem
    positionX;
    positionY;
    initialX;
    initialY
    itemId;

    constructor($diagramItem, positionX = 0, positionY = 0) {
        this.$diagramItem = $diagramItem;
        this.positionX = this.initialX = positionX;
        this.positionY = this.initialY = positionY;

        this.draw();
    }

    onDrag(data){
        this.positionX = data.currentPositionX + this.initialX;
        this.positionY = data.currentPositionY + this.initialY;
        this.draw();
    }

    endDrag(){
        this.initialX = this.positionX;
        this.initialY = this.positionY;
    }

    draw(){
        this.$diagramItem.style.left = `${this.positionX}px`;
        this.$diagramItem.style.top = `${this.positionY}px`;
    }

    getHTMLElement(){
        return this.$diagramItem;
    }

    setId(id){
        this.itemId = id;
    }

    getId(){
        return this.itemId;
    }

    getPosition(){
        return {
            x: this.positionX,
            y: this.positionY
        }
    }
}
