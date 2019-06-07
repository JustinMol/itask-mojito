import shortid from 'shortid';
import { Storable } from '../local-storage.service';
import { GraphBlock } from '../graph/graph-block/graph-block.decorator';
import { TableEditorComponent } from '../editors/table-editor/table-editor.component';
import { Type } from 'class-transformer';

export declare type DataType = any;
export declare type Coordinates = { x: number, y: number };
export declare type Location = { line: number, col: number };

export class AST {
    id: string;

    constructor() {
        this.id = shortid();
    }
}

export class ASTNode extends AST {
    coordinates: Coordinates;
    location?: Location;
}

@GraphBlock({
    type: 'user-input',
    name: 'User Input',
    svg: 'assets/svg/source/user.svg',
    description: 'Ask the user to fill in a form of a chosen type.',
    component: TableEditorComponent,
})
export class UserInputDeclaration extends ASTNode {
    varName: string = '';
    message: string = '';
    type: DataType = null;
    multiple: boolean = false;
}

@GraphBlock({
    type: 'clock-input',
    name: 'Clock Input',
    svg: 'assets/svg/source/clock.svg',
    description: '',
    component: null,
})
export class ClockInputDeclaration extends ASTNode {

}

@GraphBlock({
    type: 'shared-input',
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
    component: TableEditorComponent,
})
export class SharedInputDeclaration extends ASTNode {
    varName: string = '';
    message: string = '';
    type: DataType = null;
    multiple: boolean = false;
}

@GraphBlock({
    type: 'task-transform',
    name: 'Task Transform',
    svg: 'assets/svg/transform/task.svg',
    description: '',
    component: null,
})
export class TaskTransformDeclaration extends ASTNode {
    task: TaskDeclaration = null;
    varName: string = '';
}

@GraphBlock({
    type: 'code',
    name: 'Code Block',
    svg: 'assets/svg/transform/code.svg',
    description: '',
    component: null,
})
export class CodeTransformDeclaration extends ASTNode {
    code: string = '';
}

@GraphBlock({
    type: 'decision',
    name: 'Decision',
    svg: 'assets/svg/control/choice.svg',
    description: '',
    component: null,
})
export class DecisionControlDeclaration extends ASTNode {}

@GraphBlock({
    type: 'split',
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: '',
    component: null,
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
