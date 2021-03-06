import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { RecordTypeDeclaration } from './ast/data-type/record-type';

@Injectable({
  providedIn: 'root'
})
export class RecordTypeService extends DataService<RecordTypeDeclaration> {

  constructor(storage: LocalStorageService) {
    super(storage, RecordTypeDeclaration);
  }

  rename(model: RecordTypeDeclaration) {
    const name = window.prompt('Enter a new name');
    if (!name) return;
    if (!/^[a-zA-Z][a-zA-Z0-9]+$/.test(name)) return this.rename(model);
    model.name = name;
    this.update(model);
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

  update(t: RecordTypeDeclaration) {
    t.fields.forEach(opt => {
      if (opt.type === t) {
        window.alert('Mojito currently does not support recursive types');
        opt.type = null;
      }
    });

    return super.update(t);
  }
}
