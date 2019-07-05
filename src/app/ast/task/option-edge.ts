import { Edge } from './edge';
import { OptionDeclaration } from '../data-type/option-type';

export class OptionEdge extends Edge {
    option: 'true' | 'false' | OptionDeclaration;
}
