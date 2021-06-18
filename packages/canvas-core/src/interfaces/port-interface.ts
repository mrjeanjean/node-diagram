export interface PortInterface {
    getId: () => string | null,
    isActionType: () => boolean,
    getPosition: () => { x: number, y: number } | undefined,
    isInputPort: () => boolean,
}
