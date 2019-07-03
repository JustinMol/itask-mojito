import shortid from 'shortid';

export class AST {
    public id: string;

    constructor() {
        this.id = shortid();
    }

    equals(node: AST) {
        return this.id === node.id;
    }
}
