import {PortNameAdapter} from "./port-name-adapter";

export class DefaultPortNameAdapter implements PortNameAdapter{
    createPortNameHtml(portName: string): HTMLElement {
        let $portTitle = document.createElement("span");
        $portTitle.classList.add("port__name");
        $portTitle.innerText = portName;
        return $portTitle;
    }
}
