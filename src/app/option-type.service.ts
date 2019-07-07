import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { OptionTypeDeclaration } from './ast/data-type/option-type';
import { RecordTypeDeclaration } from './ast/data-type/record-type';
import { classToPlain } from 'class-transformer';
import { DataType } from './ast/data-type/data-type';

@Injectable({
  providedIn: 'root'
})
export class OptionTypeService extends DataService<OptionTypeDeclaration> {

  constructor(storage: LocalStorageService) {
    super(storage, OptionTypeDeclaration);
  }

  rename(model: OptionTypeDeclaration) {
    const name = window.prompt('Enter a new name');
    if (!name) return;
    if (!/^[a-zA-Z][a-zA-Z0-9]+$/.test(name)) return this.rename(model);
    model.name = name;
    this.update(model);
  }

  create(model?: OptionTypeDeclaration): Observable<OptionTypeDeclaration> {
    if (arguments.length === 1) {
      return super.create(model);
    }

    const highest = this.models
      .filter(t => t.name.startsWith('OptionType'))
      .map(t => {
        const regexed = /OptionType-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    return super.create(new OptionTypeDeclaration(`OptionType-${highest + 1}`));
  }

  update(t: OptionTypeDeclaration) {
    t.options.forEach(opt => {
      if (opt.argument === t) {
        window.alert('Mojito currently does not support recursive types');
        opt.argument = new DataType();
      }

      if (opt.argument instanceof RecordTypeDeclaration) {
        opt.argument = new DataType();
      }
    });

    return super.update(t);
  }
}
