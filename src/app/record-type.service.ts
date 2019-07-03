import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { RecordTypeDeclaration } from './ast/data-type/record-type';

@Injectable({
  providedIn: 'root'
})
export class RecordTypeService extends DataService<RecordTypeDeclaration> {

  readonly Model = RecordTypeDeclaration;

  constructor(storage: LocalStorageService) {
    super(storage);
  }

  create(model?: RecordTypeDeclaration): Observable<RecordTypeDeclaration> {
    if (arguments.length === 1) {
      return super.create(model);
    }

    const highest = this.models
      .filter(t => t.name.startsWith('RecordType'))
      .map(t => {
        const regexed = /RecordType-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    return super.create(new RecordTypeDeclaration(`RecordType-${highest + 1}`));
  }
}
