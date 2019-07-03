import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { OptionTypeDeclaration } from './ast/data-type/option-type';

@Injectable({
  providedIn: 'root'
})
export class OptionTypeService extends DataService<OptionTypeDeclaration> {

  readonly Model = OptionTypeDeclaration;

  constructor(storage: LocalStorageService) {
    super(storage);
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
}
