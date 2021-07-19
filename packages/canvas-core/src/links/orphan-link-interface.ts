import {PortModel} from "../models/port-model";
import {PlaceholderLinkModel} from "../connexion/placeholder-link-model";

export interface OrphanLinkInterface{
    handleOrphanLink: (portOrigin: PortModel, placeholderLink:PlaceholderLinkModel) => void;
}
