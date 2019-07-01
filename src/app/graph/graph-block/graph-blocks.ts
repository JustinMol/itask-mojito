import { GraphBlockOptions, getGraphBlock } from './graph-block.decorator';
import {
    UserInputDeclaration,
    TaskTransformDeclaration,
    SharedInputDeclaration,
    CodeTransformDeclaration,
    ClockInputDeclaration,
    DecisionControlDeclaration,
    SplitControlDeclaration,
    JoinControlDeclaration
} from 'src/app/ast/ast';

export const sources: GraphBlockOptions[] = [
    UserInputDeclaration,
    SharedInputDeclaration,
    ClockInputDeclaration,
].map(getGraphBlock);

export const transforms: GraphBlockOptions[] = [
    TaskTransformDeclaration,
    CodeTransformDeclaration,
].map(getGraphBlock);

export const controls: GraphBlockOptions[] = [
    DecisionControlDeclaration,
    JoinControlDeclaration,
    SplitControlDeclaration,
].map(getGraphBlock);
