import shortid from 'shortid';
import { Storable } from 'src/app/local-storage.service';
import { DataType } from './data-type';
import { EditorField } from 'src/app/editors/editor-decorator';
import { Type } from 'class-transformer';
import { StringType } from './string-type';
import { BooleanType } from './boolean-type';
import { DateType } from './date-type';
import { IntegerType } from './integer-type';

@Storable<OptionTypeDeclaration>({
    id: t => t.id,
    key: '__optionType',
})
export class OptionTypeDeclaration extends DataType {
    @Type(() => OptionDeclaration)
    options: OptionDeclaration[] = [];

    public id: string;

    constructor(name: string) {
        super(name);
        this.id = shortid();
    }
}

export class OptionDeclaration {
    @EditorField() name: string = '';

    @Type(() => DataType, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: '__type',
            subTypes: [
                { value: DataType, name: 'datatype' },
                { value: StringType, name: 'string' },
                { value: BooleanType, name: 'boolean' },
                { value: DateType, name: 'date' },
                { value: IntegerType, name: 'integer' },
            ]
        },
    })
    @EditorField({
        input: 'select',
        type: 'datatype',
        filter: (d: DataType) => !(d.constructor.name === 'RecordTypeDeclaration' || d instanceof OptionTypeDeclaration)
    })
    argument: DataType = new DataType();

    @EditorField() comment: string = '';
}
