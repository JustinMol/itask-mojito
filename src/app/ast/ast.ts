import shortid from 'shortid';
import { Storable } from '../local-storage.service';
import { GraphBlock } from '../graph/graph-block/graph-block.decorator';
import { Type, Exclude } from 'class-transformer';
import { SimpleEditor, EditorField, ConditionEditor } from '../editors/editor-decorator';
import { EventEmitter } from '@angular/core';

export declare type DataType = RecordTypeDeclaration | OptionTypeDeclaration;
export declare type Location = { line: number, col: number };

export class Coordinates {

    constructor(public x: number, public y: number) {}

    add(other: Coordinates) {
        return new Coordinates(this.x + other.x, this.y + other.y);
    }

    multiply(other: Coordinates) {
        return new Coordinates(this.x * other.x, this.y * other.y);
    }

    scale(n: number) {
        return new Coordinates(this.x * n, this.y * n);
    }

    distance(other: Coordinates) {
        const a = Math.abs(this.x - other.x);
        const b = Math.abs(this.y - other.y);
        return Math.sqrt(a * a + b * b);
    }

    snap(gridSize: number) {
        const x = this.x - this.x % gridSize; // or Math.ceil(this.x / gridSize) * gridSize
        const y = this.y - this.y % gridSize; // or Math.ceil(this.y / gridSize) * gridSize
        return new Coordinates(x, y);
    }

    toString() {
        return this.x + ',' + this.y;
    }

}

const ANCHORS: Coordinates[] = [
    new Coordinates(0.5, 0),
    new Coordinates(1, 0.5),
    new Coordinates(0.5, 1),
    new Coordinates(0, 0.5),
];

export class AST {
    public id: string;

    constructor() {
        this.id = shortid();
    }

    equals(node: ASTNode) {
        return this.id === node.id;
    }
}

@Storable({
    id: t => t.id,
    key: '__recordType',
})
export class RecordTypeDeclaration extends AST {
    fields: RecordTypeField[] = [];

    constructor(public name: string) {
        super();
    }
}

export class RecordTypeField {
    property: string = '';
    type: DataType = null;
    optional: boolean = false;
    comment: string = '';
}

@Storable({
    id: t => t.id,
    key: '__optionType',
})
export class OptionTypeDeclaration extends AST {
    options: Option[] = [];

    constructor(public name: string) {
        super();
    }
}

export class Option {
    option: string = '';
    argument: DataType = null;
    comment: string = '';
}

export class ASTNode extends AST {
    @Type(() => Coordinates)
    coordinates: Coordinates;
    location?: Location;

    @Exclude()
    isMoved$: EventEmitter<void>;

    constructor() {
        super();
        this.isMoved$ = new EventEmitter();
    }

    setCoordinates(coordinates: Coordinates) {
        if (!this.coordinates || this.coordinates.x !== coordinates.x || this.coordinates.y !== coordinates.y) {
            this.coordinates = coordinates;
            this.isMoved$.emit();
        }
    }
}

@SimpleEditor
@GraphBlock({
    name: 'User Input',
    svg: 'assets/svg/source/user.svg',
    description: 'Ask the user to fill in a form of a chosen type.',
    anchors: ANCHORS
})
export class UserInputDeclaration extends ASTNode {
    @EditorField('variable name') varName: string = '';
    @EditorField() message: string = '';
    @EditorField() type: DataType = null;
    @EditorField() multiple: boolean = false;
}

@GraphBlock({
    name: 'Clock Input',
    svg: 'assets/svg/source/clock.svg',
    description: '',
    anchors: ANCHORS,
})
export class ClockInputDeclaration extends ASTNode {}

@SimpleEditor
@GraphBlock({
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
    anchors: ANCHORS,
})
export class SharedInputDeclaration extends ASTNode {
    @EditorField('variable name') varName: string = '';
    @EditorField() message: string = '';
    @EditorField() type: DataType = null;
    @EditorField() multiple: boolean = false;
}

@GraphBlock({
    name: 'Task Transform',
    svg: 'assets/svg/transform/task.svg',
    description: '',
    anchors: ANCHORS,
})
export class TaskTransformDeclaration extends ASTNode {
    task: TaskDeclaration = null;
    varName: string = '';
}

@GraphBlock({
    name: 'Code Block',
    svg: 'assets/svg/transform/code.svg',
    description: '',
    anchors: ANCHORS,
})
export class CodeTransformDeclaration extends ASTNode {
    code: string = '';
}

export class SimpleBooleanExpression {
    value: string = '';
    condition: 'equals' | 'contains' = 'equals';
    operand: string = '';

    constructor(value = '', condition: 'equals' | 'contains' = 'equals', operand = '') {
        this.value = value;
        this.condition = condition;
        this.operand = operand;
    }
}

@ConditionEditor
@GraphBlock({
    name: 'Decision',
    svg: 'assets/svg/control/choice.svg',
    description: 'Make a decision based on a task\'s value',
    anchors: ANCHORS,
})
export class DecisionControlDeclaration extends ASTNode {
    @Type(() => SimpleBooleanExpression)
    andExpressions: SimpleBooleanExpression[][] = [[new SimpleBooleanExpression()]];
}

@GraphBlock({
    name: 'Join',
    svg: 'assets/svg/control/join.svg',
    description: '',
    anchors: ANCHORS,
})
export class JoinControlDeclaration extends ASTNode {}

@GraphBlock({
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: '',
    anchors: ANCHORS,
})
export class SplitControlDeclaration extends ASTNode {}

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

export class OptionEdge extends Edge {
    constructor(public from: DecisionControlDeclaration, public to: ASTNode) {
        super(from, to);
    }
}

@Storable({
    id: t => t.id,
    key: '__task',
})
export class TaskDeclaration extends AST {
    constructor (public name: string) {
        super();
    }

    parameters: ParameterDeclaration[] = [];

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

export class ParameterDeclaration extends AST {
    varName: string;
    type: DataType;
}
