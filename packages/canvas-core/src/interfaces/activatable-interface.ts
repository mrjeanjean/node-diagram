import {NodeModel} from "..";

export interface ActivatableInterface{
    active: boolean;
    setActive: (active: boolean) => void;
    isActive: () => boolean;
    getModel: () => NodeModel
}

// Type guard (used because instanceof Interface doesn't exist yet
export function canBeActivated(object: any): object is ActivatableInterface{
    return "setActive" in object;
}
