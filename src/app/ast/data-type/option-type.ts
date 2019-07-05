import shortid from 'shortid';
import { Storable } from 'src/app/local-storage.service';
import { DataType } from './data-type';

@Storable<OptionTypeDeclaration>({
    id: t => t.id,
    key: '__optionType',
})
export class OptionTypeDeclaration extends DataType {
    options: OptionDeclaration[] = [];

    public id: string;

    constructor(name: string) {
        super(name);
        this.id = shortid();
    }
}

export class OptionDeclaration {
    name: string = '';
    argument: DataType = null;
    comment: string = '';
}
