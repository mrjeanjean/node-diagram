import {portsTypes} from "../ports/ports-types";

export class DefaultNode{
    $node: HTMLElement;
    $nodeTitle: HTMLElement;

    constructor($container: HTMLElement, type: string) {
        this.$node = document.createElement("div");
        this.$node.classList.add("node");
        this.$node.classList.add(`node--${type}`);

        let $nodeBody = document.createElement("div");
        $nodeBody.classList.add("node__body");

        this.$nodeTitle = document.createElement("div");
        this.$nodeTitle.classList.add("node__title");

        this.$node.appendChild(this.$nodeTitle);
        this.$node.appendChild($nodeBody);

        this.$node.appendChild(this.createPortContainer(portsTypes.input));
        this.$node.appendChild(this.createPortContainer(portsTypes.output));
        this.$node.appendChild(this.createPortContainer(portsTypes.outputRight));
        this.$node.appendChild(this.createPortContainer(portsTypes.actionInput));
        this.$node.appendChild(this.createPortContainer(portsTypes.actionOutput));

        $container.appendChild(this.$node);
    }

    /**
     * @return {HTMLDivElement}
     */
    createPortContainer(portType: string): HTMLDivElement {
        let $portContainer = document.createElement("div");
        $portContainer.classList.add("port-container", `port-container--${portType}`);
        return $portContainer;
    }

    /**
     * @return {HTMLElement}
     */
    getHTMLElement():HTMLElement{
        return this.$node;
    }

    setHTMLTitle(title:string):void{
        this.$nodeTitle.innerText = title;
    }
}
