import shortid from 'shortid';
import { Storable } from 'src/app/local-storage.service';
import { DataType } from './data-type';
import { EditorField } from 'src/app/editors/editor-decorator';
import { Type } from 'class-transformer';
import { StringType } from './string-type';
import { BooleanType } from './boolean-type';
import { DateType } from './date-type';
import { OptionTypeDeclaration } from './option-type';
import { IntegerType } from './integer-type';

@Storable<RecordTypeDeclaration>({
    id: t => t.id,
    key: '__recordType',
})
export class RecordTypeDeclaration extends DataType {
    @Type(() => RecordTypeField)
    fields: RecordTypeField[] = [];

    public id: string;

    constructor(name: string) {
        super(name);
        this.id = shortid();
    }
}

export class RecordTypeField {
    @EditorField() property: string = '';
    
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
            ]
        }
    })
    @EditorField({ input: 'select', type: 'datatype' })
    type: DataType = new DataType();
    
    @EditorField({ input: 'checkbox' }) optional: boolean = false;
    @EditorField() comment: string = '';
}
