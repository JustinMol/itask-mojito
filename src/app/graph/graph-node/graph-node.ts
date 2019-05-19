import { GraphBlock } from '../graph-block/graph-block';
import shortid from 'shortid';

export type Coordinates = {
    x: number,
    y: number,
};

export class GraphNode {

    public static from(object: any): GraphNode {
        if (!object) {
            return null;
        }

        const node = new GraphNode(object.block, object.coords);
        if (object.id) {
            node.id = object.id;
        }

        return node;
    }

    public id: string;
    public block: GraphBlock;
    public coords: Coordinates;

    constructor(block: GraphBlock, coords: Coordinates) {
        this.id = shortid();
        this.block = block;
        this.coords = coords;
    }
}
