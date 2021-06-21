import {LinkFactory, NodeFactory} from "./factory-interface";

export class ItemsFactories{
    nodeFactories: Map<string, NodeFactory>;
    linkFactories: Map<string, LinkFactory>;

    constructor() {
        this.nodeFactories = new Map<string, NodeFactory>();
        this.linkFactories = new Map<string, LinkFactory>();
    }

    registerNodeFactory(type: string, nodeFactory: NodeFactory): void{
        this.nodeFactories.set(type, nodeFactory);
    }

    registerLinkFactory(type: string, linkFactory: LinkFactory): void{
        this.linkFactories.set(type, linkFactory);
    }

    getNodeFactory(type: string): NodeFactory{
        const nodeFactory = this.nodeFactories.get(type);
        if(!nodeFactory){
            throw new Error(`Factory for node with type ${type} does not exist.`)
        }
        return nodeFactory;
    }

    getLinkFactory(type: string): LinkFactory{
        const linkFactory = this.linkFactories.get(type);
        if(!linkFactory){
            throw new Error(`Factory for link with type ${type} does not exist.`)
        }

        return linkFactory;
    }
}
