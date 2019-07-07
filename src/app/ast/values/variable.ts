import { DataType } from '../data-type/data-type';
import { SelectOption } from 'src/app/editors/field-input/field-input.component';

export class Variable implements SelectOption {
    constructor(public name: string, public type: DataType) {}

    isValid() {
        return this.name !== '' && this.type != null;
    }

    equals(other: Variable): boolean {
        if (!other) return false;
        return this.name === other.name && this.type === other.type;
    }

    toString(): string {
        if (!this.name) return '';
        if (!this.type) return this.name;
        return `${this.name}: ${this.type.name}`;
    }
}
