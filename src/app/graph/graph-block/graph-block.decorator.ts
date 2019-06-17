import { Type } from '@angular/core';
import { ASTNode } from 'src/app/ast/ast';

const GraphBlockMetadataKey = Symbol('GraphBlock');

export interface GraphBlockOptions {
    name: string;
    svg: string;
    description: string;
    NodeType?: Type<ASTNode>;
}

export function GraphBlock(options: GraphBlockOptions) {
    return constructor => {
        if (!options.NodeType) {
            options.NodeType = constructor;
        }

        Reflect.defineMetadata(GraphBlockMetadataKey, options, constructor);
    }
}

export function getGraphBlock(constructor: Function): GraphBlockOptions {
    const options: GraphBlockOptions = Reflect.getMetadata(GraphBlockMetadataKey, constructor);
    if (!options) throw new Error(`Class '${constructor.name}' is not a GraphBlock`);

    return options;
}
