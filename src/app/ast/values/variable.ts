import { DataType } from '../data-type/data-type';
import { SelectOption } from 'src/app/editors/field-input/field-input.component';
import { Type } from 'class-transformer';
import { DataTypeDiscriminator } from '../data-type/data-type-discriminator';

export class Variable implements SelectOption {
    @Type(() => DataType, DataTypeDiscriminator)
    public type: DataType;

    constructor(public name: string, type: DataType) {
        this.type = type;
    }

    isValid() {
        return this.name !== '' && this.type != null;
    }

    equals(other: Variable): boolean {
        if (!other) return false;
        return this.name === other.name && this.type.equals(other.type);
    }

    toString(): string {
        if (!this.name) return '';
        if (!this.type || !this.type.name) return this.name;
        return `${this.name}: ${this.type.name}`;
    }
}
