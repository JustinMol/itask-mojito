import { Type } from 'class-transformer';
import { Storable } from 'src/app/local-storage.service';
import { ASTNode } from '../ast-node/ast-node';
import { AST } from '../ast';
import { Variable } from '../values/variable';
import { Edge } from '../edge/edge';
import { SequenceEdge } from '../edge/sequence-edge';
import { OptionEdge } from '../edge/option-edge';
import { NodeDiscriminator } from '../ast-node/node-discriminator';

@Storable<TaskDeclaration>({
    id: t => t.id,
    key: '__task',
})
export class TaskDeclaration extends AST {
    constructor (public name: string) {
        super();
    }

    inputs: Variable[] = [];
    outputs: Variable[] = [];

    @Type(() => ASTNode, NodeDiscriminator)
    nodes: ASTNode[] = [];

    @Type(() => Edge, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: SequenceEdge, name: 'sequence' },
                { value: OptionEdge, name: 'option' },
            ],
        }
    })
    edges: Edge[] = [];
}
