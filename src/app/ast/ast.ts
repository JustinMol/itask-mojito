import shortid from 'shortid';
import { Storable } from '../local-storage.service';
import { GraphBlock } from '../graph/graph-block/graph-block.decorator';
import { Type } from 'class-transformer';
import { SimpleEditor, EditorField } from '../editors/editor-decorator';

export declare type DataType = RecordTypeDeclaration | OptionTypeDeclaration;
export declare type Coordinates = { x: number, y: number };
export declare type Location = { line: number, col: number };

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
    coordinates: Coordinates;
    location?: Location;
}

@SimpleEditor
@GraphBlock({
    name: 'User Input',
    svg: 'assets/svg/source/user.svg',
    description: 'Ask the user to fill in a form of a chosen type.',
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
})
export class ClockInputDeclaration extends ASTNode {}

@SimpleEditor
@GraphBlock({
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
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
})
export class TaskTransformDeclaration extends ASTNode {
    task: TaskDeclaration = null;
    varName: string = '';
}

@GraphBlock({
    name: 'Code Block',
    svg: 'assets/svg/transform/code.svg',
    description: '',
})
export class CodeTransformDeclaration extends ASTNode {
    code: string = '';
}

@GraphBlock({
    name: 'Decision',
    svg: 'assets/svg/control/choice.svg',
    description: '',
})
export class DecisionControlDeclaration extends ASTNode {}

@GraphBlock({
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: '',
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
