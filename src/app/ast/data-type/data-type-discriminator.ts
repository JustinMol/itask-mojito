import { StringType } from './string-type';
import { RecordTypeDeclaration } from './record-type';
import { OptionTypeDeclaration } from './option-type';

export const DataTypeDiscriminator = {
    discriminator: {
        property: '__type',
        subTypes: [
            { value: StringType, name: 'string' },
            { value: RecordTypeDeclaration, name: 'record' },
            { value: OptionTypeDeclaration, name: 'option' },
        ]
    }
};
