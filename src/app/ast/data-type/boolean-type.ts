import { DataType } from './data-type';

export class BooleanType extends DataType {
    constructor() {
        super('Boolean');
    }
};

export const booleanType = new BooleanType();
