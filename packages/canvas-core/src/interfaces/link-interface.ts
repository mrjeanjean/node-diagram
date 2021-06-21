import {PortInterface} from "./port-interface";

export interface LinkInterface {
    getStartPort: () => PortInterface,
    getEndPort: () => PortInterface
}
