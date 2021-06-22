import {AbstractNodeControl} from "./abstract-node-control";
import {createInput} from "./input-control";

export class InputNodeControl extends AbstractNodeControl<string>{
    createControl(defaultValue: string | null, callback: Function): HTMLElement {
        return createInput(defaultValue, callback);
    }
}
