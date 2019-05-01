import { GraphBlock } from './graph-block';

export const GraphNodeType = Symbol('GraphBlock');

export class GraphNode {

    constructor(block: GraphBlock, coords: { x: number; y: number; }) {
        this.id = 'henk';
        this.block = block;
        this.coords = coords;
    }

    id: string;

    block: GraphBlock;

    coords: {
        x: number,
        y: number,
    };

    move(coords: { x: number; y: number; }) {
        this.coords = coords;
    }
}
