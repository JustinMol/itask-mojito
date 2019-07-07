import { Type } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { Coordinates } from 'src/app/ast/ast-node/coordinates';

const GraphBlockMetadataKey = Symbol('GraphBlock');

export class GraphBlockOptions {
    name: string;
    svg: string;
    description: string;
    anchors?: Coordinates[];
    NodeType?: Type<ASTNode>;

    getAnchorCoordinates(origin: Coordinates): Coordinates[] {
        if (!this.anchors) {
            return [origin];
        }

        return this.anchors.map(anchor => anchor.scale(50).add(origin));
    }
}

export function GraphBlock(options: { name: string; svg: string; description: string; anchors?: Coordinates[]; NodeType?: Type<ASTNode>; }) {
    options = plainToClass(GraphBlockOptions, options);
    return constructor => {
        if (!options.NodeType) {
            options.NodeType = constructor;
        }

        Reflect.defineMetadata(GraphBlockMetadataKey, options, constructor);
    }
}

export function getGraphBlock(constructor: Function): GraphBlockOptions {
    const options: GraphBlockOptions = Reflect.getMetadata(GraphBlockMetadataKey, constructor);
    if (!options) {
        console.error(`Class '${constructor.name}' is not a GraphBlock`);
        return null;
    }

    return options;
}
