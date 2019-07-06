import { Storable } from 'src/app/local-storage.service';
import { DataType } from './data-type';
import shortid from 'shortid';
import { EditorField } from 'src/app/editors/editor-decorator';

@Storable<RecordTypeDeclaration>({
    id: t => t.id,
    key: '__recordType',
})
export class RecordTypeDeclaration extends DataType {
    fields: RecordTypeField[] = [];

    public id: string;

    constructor(name: string) {
        super(name);
        this.id = shortid();
    }
}

export class RecordTypeField {
    @EditorField() property: string = '';
    @EditorField({ input: 'select', type: DataType }) type: DataType = new DataType();
    @EditorField() optional: boolean = false;
    @EditorField() comment: string = '';
}
