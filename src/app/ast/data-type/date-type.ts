import { DataType } from './data-type';

export class DateType extends DataType {
    constructor() {
        super('Date');
    }
};

export const dateType = new DateType();
