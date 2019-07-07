import { StringType } from './string-type';
import { RecordTypeDeclaration } from './record-type';
import { OptionTypeDeclaration } from './option-type';
import { DataType } from './data-type';
import { BooleanType } from './boolean-type';
import { DateType } from './date-type';
import { ListType } from './list-type';

export const DataTypeDiscriminator = {
    discriminator: {
        property: '__type',
        subTypes: [
            { value: DataType, name: 'datatype' },
            { value: StringType, name: 'string' },
            { value: RecordTypeDeclaration, name: 'record' },
            { value: OptionTypeDeclaration, name: 'option' },
            { value: BooleanType, name: 'boolean' },
            { value: DateType, name: 'date' },
            { value: ListType, name: 'list' },
        ]
    }
};
