/**
 * Generic event listener
 */
export class EventDispatcher{
    observers

    constructor() {
        this.observers = [];
    }

    add(type, callback){
        console.log(type)
        this.observers.push({
            type,
            callback
        })
    }

    remove(type, callback){
        this.observers = this.observers.filter(entry=>
            entry.type !== type && entry.callback !== callback
        )
    }

    fire(type, data){
        this.observers.forEach(entry=>{
            if(entry.type === type){
                entry.callback(data);
            }
        });
    }
}
