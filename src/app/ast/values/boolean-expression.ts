import { Variable } from './variable';
import { EditorField } from 'src/app/editors/editor-decorator';

export class SimpleBooleanExpression {
    @EditorField({ type: 'variable', input: 'select', order: 1 })
    variable: Variable;

    @EditorField({ type: 'condition', input: 'select', order: 2 })
    condition: 'equals' | 'contains' | 'pattern match';

    @EditorField({ order: 3 })
    value: string = '';

    constructor(variable: Variable = null, condition: 'equals' = 'equals', value = '') {
        this.variable = variable;
        this.condition = condition;
        this.value = value;
    }
}
