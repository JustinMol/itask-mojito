import { Type } from 'class-transformer';
import { Storable } from 'src/app/local-storage.service';
import { ASTNode } from '../ast-node/ast-node';
import { AST } from '../ast';
import { Edge } from '../edge/edge';
import { SequenceEdge } from '../edge/sequence-edge';
import { OptionEdge } from '../edge/option-edge';
import { NodeDiscriminator } from '../ast-node/node-discriminator';
import { SelectOption } from 'src/app/editors/field-input/field-input.component';
import { TaskOutput } from './task-output';
import { TaskInput } from './task-input';

@Storable<TaskDeclaration>({
    id: t => t.id,
    key: '__task',
})
export class TaskDeclaration extends AST implements SelectOption {
    constructor (public name: string) {
        super();
    }

    @Type(() => TaskInput)
    input: TaskInput = new TaskInput();

    @Type(() => TaskOutput)
    output: TaskOutput = new TaskOutput();

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

    equals(other: TaskDeclaration): boolean {
        if (!other) return false;
        if (other === this) return true;
        return other.id === this.id;
    }
}
