/**
 * Generic event listener
 */
export class EventDispatcher{
    observers: Array<{ type: string, callback: Function }>

    constructor() {
        this.observers = [];
    }

    add(type: string, callback: Function){
        this.observers.push({
            type,
            callback
        })
    }

    remove(type: string, callback: Function){
        this.observers = this.observers.filter(entry=>
            entry.type !== type && entry.callback !== callback
        )
    }

    fire(type: string, data: any){
        this.observers.forEach(entry=>{
            if(entry.type === type){
                entry.callback(data);
            }
        });
    }
}
