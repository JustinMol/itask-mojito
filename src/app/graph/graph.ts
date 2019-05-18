import { GraphNode } from './graph-node';

export class Graph {
    public nodes: GraphNode[];

    public clear() {
        this.nodes = [];
    }
}
