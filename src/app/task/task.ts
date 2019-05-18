import shortid from 'shortid';
import { GraphNode } from '../graph/graph-node';

export class Task {

    public static from(object: any): Task {
        if (!object) {
            return null;
        }

        const task = new Task(object.name);
        if (object.id) {
            task.id = object.id;
        }

        if (Array.isArray(object.nodes)) {
            task.nodes = object.nodes.map(n => GraphNode.from(n));
        }

        return task;
    }

    public id: string;
    public name: string;
    public nodes: GraphNode[];

    constructor(name: string) {
        this.id = shortid();
        this.name = name;
        this.nodes = [];
    }
}
