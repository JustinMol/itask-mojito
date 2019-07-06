import { Storable } from 'src/app/local-storage.service';
import { DataType } from './data-type';
import shortid from 'shortid';

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
    property: string = '';
    type: DataType = new DataType();
    optional: boolean = false;
    comment: string = '';
}
