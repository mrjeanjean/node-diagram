import {PortNameAdapter} from "./port-name-adapter";

export class FontAwesomePortNameAdapter implements PortNameAdapter{
    fontAwesomeMap: Map<string, string>;

    constructor() {
        this.fontAwesomeMap = new Map<string, string>();
        this.fontAwesomeMap.set("activation", "fa-eye");
        this.fontAwesomeMap.set("rename", "fa-pencil-alt");
        this.fontAwesomeMap.set("deactivate", "fa-eye-slash");
        this.fontAwesomeMap.set("activate", "fa-eye");
        this.fontAwesomeMap.set("toggleActivation", "fa-random");
    }

    createPortNameHtml(portName: string): HTMLElement {
        let $portTitle = document.createElement("i");
        $portTitle.classList.add("port__name");
        $portTitle.classList.add("fas");
        const iconName = this.fontAwesomeMap.get(portName);
        if(!iconName){
            console.warn(`No icon found for '${portName}' port name.`)
        }

        $portTitle.classList.add(iconName ?? "fa-question");
        return $portTitle;
    }
}
