import { OptionDeclaration } from '../data-type/option-type';

export class EdgeConnector {
    isSequence: boolean;
    options: (boolean | OptionDeclaration)[];
    limit: number;

    constructor(isSequence = true, options = [], limit = 1) {
        this.isSequence = isSequence;
        this.options = options;
        this.limit = limit;
    }
}

export const defaultSequenceConnector = new EdgeConnector();
export const booleanSequenceConnector = new EdgeConnector(false, [true, false], 2);
