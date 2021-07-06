import {AbstractNodeControl} from "./abstract-node-control";
import {createInput} from "./input-control";
import {createTextarea} from "./textarea-control";
import {createToggle} from "./toggle-visibility-control";

export class VisibilityNodeControl extends AbstractNodeControl<boolean>{
    createControl(defaultValue: boolean, callback: Function): HTMLElement {
        return createToggle(defaultValue, callback);
    }
}
