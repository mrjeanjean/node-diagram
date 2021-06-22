import {generateRandomColor} from "../utils/helpers";
import {portsTypes} from "../ports/ports-types";

export class DefaultNode{
    createNode($container: HTMLElement, type: string) :HTMLElement{
        let $node = document.createElement("div");
        $node.classList.add("node");
        $node.classList.add(`node-${type}`);

        let $nodeBody = document.createElement("div");
        $nodeBody.classList.add("node-body");

        let $nodeTitle = document.createElement("div");
        $nodeTitle.classList.add("node-title");

        $node.style.backgroundColor = generateRandomColor();
        $node.appendChild($nodeTitle);
        $node.appendChild($nodeBody);

        $node.appendChild(this.createPortContainer(portsTypes.input));
        $node.appendChild(this.createPortContainer(portsTypes.output));
        $node.appendChild(this.createPortContainer(portsTypes.actionInput));
        $node.appendChild(this.createPortContainer(portsTypes.actionOutput));

        $container.appendChild($node);
        return $node;
    }

    /**
     * @return {HTMLDivElement}
     */
    createPortContainer(portType: string): HTMLDivElement {
        let $portContainer = document.createElement("div");
        $portContainer.classList.add("port-container", `port-container--${portType}`);
        return $portContainer;
    }
}
