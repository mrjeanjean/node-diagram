import {ActivatableInterface} from "../interfaces/activatable-interface";
import {createToggle} from "../node-controls/toggle-control";

export class ActivatableItem {
    item: ActivatableInterface;
    $toggle: HTMLElement;

    constructor(item: ActivatableInterface) {
        this.item = item;
        this.handleToggle = this.handleToggle.bind(this);
        this.$toggle = createToggle(this.item.isActive(), this.handleToggle);
        this.updateNodeModel();
    }

    handleToggle(value:boolean):void{
        this.item.setActive(value);
        this.updateNodeModel();
    }

    getToggleHTML():HTMLElement{
        return this.$toggle;
    }

    updateNodeModel():void{
        if(this.item.isActive()){
            this.item.getModel().getHTMLElement().classList.remove("disabled");
        }else{
            this.item.getModel().getHTMLElement().classList.add("disabled");
        }
    }

    static makeActivatable(model: any) {
        return new ActivatableItem(model);
    }
}
