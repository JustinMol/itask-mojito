import { Variable } from './variable';

export class SimpleBooleanExpression {
    variable: Variable;
    condition: 'equals' | 'contains' | 'pattern match';
    value: string = '';

    constructor(variable: Variable = null, condition: 'equals' = 'equals', value = '') {
        this.variable = variable;
        this.condition = condition;
        this.value = value;
    }
}
