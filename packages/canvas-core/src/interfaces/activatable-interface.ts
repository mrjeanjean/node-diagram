export interface ActivatableInterface{
    setActive: (active: boolean) => void;
    isActive: () => boolean;
}

// Type guard (used because instanceof Interface doesn't exist yet
export function canBeActivated(object: any): object is ActivatableInterface{
    return "setActive" in object;
}
