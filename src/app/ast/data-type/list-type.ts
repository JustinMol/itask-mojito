import { DataType } from './data-type';
import { Type } from 'class-transformer';

import { StringType } from './string-type';
import { RecordTypeDeclaration } from './record-type';
import { OptionTypeDeclaration } from './option-type';
import { BooleanType } from './boolean-type';
import { DateType } from './date-type';
import { IntegerType } from './integer-type';

export class ListType extends DataType {
    @Type(() => DataType, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: DataType, name: 'datatype' },
                { value: StringType, name: 'string' },
                { value: RecordTypeDeclaration, name: 'record' },
                { value: OptionTypeDeclaration, name: 'option' },
                { value: BooleanType, name: 'boolean' },
                { value: DateType, name: 'date' },
                { value: IntegerType, name: 'integer' },
                { value: ListType, name: 'list' },
            ]
        }
    })
    public type: DataType;

    constructor(type: DataType) {
        super('List');
        this.type = type;
    }

    get name(): string {
        if (!this.type || !this.type.name) return null;
        return `${this.type.name}[]`;
    }
};
