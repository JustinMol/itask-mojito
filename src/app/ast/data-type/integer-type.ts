import { DataType } from './data-type';

export class IntegerType extends DataType {
    constructor() {
        super('Integer');
    }
};

export const integerType = new IntegerType();
