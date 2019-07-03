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

    constructor(public name: string) {
        super();
        this.id = shortid();
    }
}

export class RecordTypeField {
    property: string = '';
    type: DataType = null;
    optional: boolean = false;
    comment: string = '';
}
