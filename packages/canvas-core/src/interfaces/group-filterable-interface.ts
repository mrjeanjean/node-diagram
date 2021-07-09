import {NodeModel} from "..";

export interface GroupFilterInterface{
    currentFilter: string;
    pickUpNumber: number;
    setFilter: (filter: string) => void;
    getFilter: () => string;
    setPickUpNumber: (value: number) => void;
    getPickUpNumber: () => number;
    getModel: () => NodeModel;
}

// Type guard (used because instanceof Interface doesn't exist yet
export function canBeFiltered(object: any): object is GroupFilterInterface{
    return "setActive" in object;
}
