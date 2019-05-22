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

        const node = new GraphNode(object.type, object.coords);
        if (object.id) {
            node.id = object.id;
        }

        return node;
    }

    public id: string;
    public type: string;
    public coords: Coordinates;

    constructor(type: string, coords: Coordinates) {
        this.id = shortid();
        this.type = type;
        this.coords = coords;
    }
}