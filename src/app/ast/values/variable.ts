import { DataType } from '../data-type/data-type';

export class Variable {
    constructor(public name: string, public type: DataType) {}

    isValid() {
        return this.name !== '' && this.type != null;
    }
}
