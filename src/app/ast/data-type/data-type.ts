import { SelectOption } from 'src/app/editors/field-input/field-input.component';

export class DataType implements SelectOption {
    private _name: string;

    constructor(name?: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    equals(other: DataType): boolean {
        if (!other) return false;
        return other.name === this.name;
    }
};
