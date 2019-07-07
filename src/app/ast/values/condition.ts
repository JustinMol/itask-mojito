import { SelectOption } from 'src/app/editors/field-input/field-input.component';

export class Condition implements SelectOption {
    constructor(public name: string) {}

    equals(other: Condition) {
        return this.name === other.name;
    }
}

export const CONDITIONS: Condition[] = [
    new Condition('='),
    new Condition('>'),
    new Condition('<'),
    new Condition('>='),
    new Condition('<='),
    new Condition('contains'),
]