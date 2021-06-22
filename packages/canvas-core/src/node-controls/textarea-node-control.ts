import {AbstractNodeControl} from "./abstract-node-control";
import {createInput} from "./input-control";
import {createTextarea} from "./textarea-control";

export class TextareaNodeControl extends AbstractNodeControl<string>{
    createControl(defaultValue: string | null, callback: Function): HTMLElement {
        return createTextarea(defaultValue, callback);
    }
}
