export interface RenamableInterface{
    rename: (name: string) => void;
}

// Type guard (used because instanceof Interface doesn't exist yet
export function canBeRenamed(object: any): object is RenamableInterface{
    return "rename" in object;
}
