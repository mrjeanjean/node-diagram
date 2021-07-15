import {CanvasEngine, GroupFilterInterface, GroupNodeModel} from "canvas-core";
import {ContextMenu} from "../context-menu/context-menu";
import {createSelect} from "./select-control";
import {createInput} from "./input-control";
import {createSpinner} from "./spinner-control";

export const createGroupNodeFilters = (
    groupNodeModel: GroupFilterInterface,
    canvasEngine: CanvasEngine
) => {

    const groupNodeFilters = {
        "all": "Display all",
        "pickup": "Pick up some",
        "one-by-one": "One by one"
    }

    const $nodeFilters = document.createElement("div");
    $nodeFilters.classList.add("node-filters__wrapper");

    const {$controlWrapper:$input, setValue} = createSpinner(0, (value:number)=>{
        groupNodeModel.setPickUpNumber(value);
        update();
    })

    function update(){
        if(groupNodeModel.currentFilter === "pickup"){
            $input.classList.remove("hidden");
        }else{
            $input.classList.add("hidden");
            groupNodeModel.setPickUpNumber(0);
            setValue(0);
        }
    }

    update();

    const {$select, close} = createSelect("all", groupNodeFilters, (value: string)=>{
        groupNodeModel.setFilter(value);
        update();
    }, "Filter");

    console.log($select)

    $nodeFilters.appendChild($select);
    $nodeFilters.appendChild($input);
    groupNodeModel.getModel().getHTMLTitle().insertAdjacentElement('afterend', $nodeFilters)

    $nodeFilters.addEventListener("mousedown", (e) => {
        e.stopPropagation();
    })

    document.addEventListener("mousedown", ()=>{
        close();
    })

    return $nodeFilters;
}
