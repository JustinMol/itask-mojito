import { SelectOption } from 'src/app/editors/field-input/field-input.component';

export class DataType implements SelectOption {
    public name: string;

    constructor(name?: string) {
        this.name = name;
    }

    equals(other: DataType): boolean {
        if (!other) return false;
        return other.name === this.name;
    }
};
