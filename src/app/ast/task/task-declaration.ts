import { Type } from 'class-transformer';
import { Storable } from 'src/app/local-storage.service';
import { UserInputDeclaration } from '../sources/user-input';
import { SharedInputDeclaration } from '../sources/shared-input';
import { ClockInputDeclaration } from '../sources/clock-input';
import { TaskTransformDeclaration } from '../transforms/task-transform';
import { CodeTransformDeclaration } from '../transforms/code-transform';
import { DecisionControlDeclaration } from '../controls/decision';
import { JoinControlDeclaration } from '../controls/join';
import { SplitControlDeclaration } from '../controls/parallel-split';
import { ASTNode } from '../ast-node/ast-node';
import { AST } from '../ast';
import { Variable } from '../values/variable';

const NodeDiscriminator = {
    discriminator: {
        property: '__type',
        subTypes: [
            { value: UserInputDeclaration, name: 'user-input' },
            { value: SharedInputDeclaration, name: 'shared-input' },
            { value: ClockInputDeclaration, name: 'clock-input' },
            { value: TaskTransformDeclaration, name: 'task-transform' },
            { value: CodeTransformDeclaration, name: 'code-transform' },
            { value: DecisionControlDeclaration, name: 'decision-control' },
            { value: JoinControlDeclaration, name: 'join-control' },
            { value: SplitControlDeclaration, name: 'split-control' },
        ]
    }
};

export class Edge {
    @Type(() => ASTNode, NodeDiscriminator)
    public from: ASTNode;

    @Type(() => ASTNode, NodeDiscriminator)
    public to: ASTNode;

    constructor(from: ASTNode, to: ASTNode) {
        this.from = from;
        this.to = to;
    }
}

export class SequenceEdge extends Edge {}

export class OptionEdge extends Edge {}

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
