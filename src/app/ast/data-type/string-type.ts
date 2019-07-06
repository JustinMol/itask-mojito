import { DataType } from './data-type';

export class StringType extends DataType {
    constructor() {
        super('String');
    }
};

export const stringType = new StringType();
