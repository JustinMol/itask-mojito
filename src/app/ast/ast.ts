import shortid from 'shortid';
import { Storable } from '../local-storage.service';
import { GraphBlock } from '../graph/graph-block/graph-block.decorator';
import { Type, Exclude } from 'class-transformer';
import { SimpleEditor, EditorField } from '../editors/editor-decorator';
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
    id: string;

    constructor() {
        this.id = shortid();
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

export class SequenceEdge {
    constructor(public from: ASTNode, public to: ASTNode) {}
}

export class OptionEdge {
    from: DecisionControlDeclaration;
    to: ASTNode;
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

@GraphBlock({
    name: 'Decision',
    svg: 'assets/svg/control/choice.svg',
    description: '',
    anchors: ANCHORS,
})
export class DecisionControlDeclaration extends ASTNode {}

@GraphBlock({
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: '',
    anchors: ANCHORS,
})
export class SplitControlDeclaration extends ASTNode {}

@Storable({
    id: t => t.id,
    key: '__task',
})
export class TaskDeclaration extends AST {
    constructor (public name: string) {
        super();
    }

    parameters: ParameterDeclaration[] = [];

    @Type(() => ASTNode, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: UserInputDeclaration, name: 'user-input' },
                { value: SharedInputDeclaration, name: 'shared-input' },
                { value: ClockInputDeclaration, name: 'clock-input' },
                { value: TaskTransformDeclaration, name: 'task-transform' },
                { value: CodeTransformDeclaration, name: 'code-transform' },
                { value: DecisionControlDeclaration, name: 'decision-control' },
                { value: SplitControlDeclaration, name: 'split-control' },
            ]
        }
    })
    body: ASTNode[] = [];
}

export class ParameterDeclaration extends AST {
    varName: string;
    type: DataType;
}
