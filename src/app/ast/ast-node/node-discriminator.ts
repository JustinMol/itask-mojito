import { UserInputDeclaration } from '../sources/user-input';
import { SharedInputDeclaration } from '../sources/shared-input';
import { ClockInputDeclaration } from '../sources/clock-input';
import { TaskTransformDeclaration } from '../transforms/task-transform';
import { CodeTransformDeclaration } from '../transforms/code-transform';
import { DecisionControlDeclaration } from '../controls/decision';
import { JoinControlDeclaration } from '../controls/join';
import { SplitControlDeclaration } from '../controls/parallel-split';
import { PatternMatchExpression } from '../values/pattern-match-expression';
import { ShowMessageDeclaration } from '../sources/show-message';
import { UserSelectDeclaration } from '../sources/user-select';

export const NodeDiscriminator = {
    discriminator: {
        property: '__type',
        subTypes: [
            { value: UserInputDeclaration, name: 'user-input' },
            { value: SharedInputDeclaration, name: 'shared-input' },
            { value: ClockInputDeclaration, name: 'clock-input' },
            { value: ShowMessageDeclaration, name: 'show-message' },
            { value: UserSelectDeclaration, name: 'user-select', },
            { value: TaskTransformDeclaration, name: 'task-transform' },
            { value: CodeTransformDeclaration, name: 'code-transform' },
            { value: DecisionControlDeclaration, name: 'decision-control' },
            { value: JoinControlDeclaration, name: 'join-control' },
            { value: SplitControlDeclaration, name: 'split-control' },
            { value: PatternMatchExpression, name: 'pattern-match' },
        ]
    }
};
