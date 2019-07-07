import { GraphBlockOptions, getGraphBlock } from './graph-block.decorator';
import { UserInputDeclaration } from 'src/app/ast/sources/user-input';
import { SharedInputDeclaration } from 'src/app/ast/sources/shared-input';
import { ClockInputDeclaration } from 'src/app/ast/sources/clock-input';
import { TaskTransformDeclaration } from 'src/app/ast/transforms/task-transform';
import { CodeTransformDeclaration } from 'src/app/ast/transforms/code-transform';
import { DecisionControlDeclaration } from 'src/app/ast/controls/decision';
import { JoinControlDeclaration } from 'src/app/ast/controls/join';
import { SplitControlDeclaration } from 'src/app/ast/controls/parallel-split';
import { PatternMatchExpression } from 'src/app/ast/values/pattern-match-expression';
import { ShowMessageDeclaration } from 'src/app/ast/sources/show-message';
import { UserSelectDeclaration } from 'src/app/ast/sources/user-select';

export const sources: GraphBlockOptions[] = [
    UserInputDeclaration,
    SharedInputDeclaration,
    UserSelectDeclaration,
    ClockInputDeclaration,
    ShowMessageDeclaration,
].map(getGraphBlock);

export const transforms: GraphBlockOptions[] = [
    TaskTransformDeclaration,
    CodeTransformDeclaration,
].map(getGraphBlock);

export const controls: GraphBlockOptions[] = [
    DecisionControlDeclaration,
    JoinControlDeclaration,
    SplitControlDeclaration,
    PatternMatchExpression,
].map(getGraphBlock);
