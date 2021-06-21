import {LinkFactory} from "./factory-interface";
import {createSVGElement} from "../utils/helpers";
import {PortModel} from "../models/port-model";
import {LinkModel} from "../models/link-model";

export class DefaultLinkFactory implements LinkFactory{
    createLinkHTML($container: SVGElement): SVGElement {
        let $linkGroup = createSVGElement("g");
        let $link = createSVGElement("path");
        let $LinkHandle = createSVGElement("path");

        $linkGroup.classList.add("link__wrapper");
        $link.classList.add("link");
        $LinkHandle.classList.add("link-handle");

        $linkGroup.appendChild($link);
        $linkGroup.appendChild($LinkHandle);

        $container.appendChild($linkGroup);
        return $linkGroup;
    }

    createLinkModel($link: SVGElement, startPortModel: PortModel, endPortModel: PortModel): LinkModel {
        return new LinkModel($link, startPortModel, endPortModel);
    }
}
