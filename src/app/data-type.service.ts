import { Injectable } from '@angular/core';
import { RecordTypeService } from './record-type.service';
import { OptionTypeService } from './option-type.service';
import { Observable, combineLatest } from 'rxjs';
import { DataType } from './ast/data-type/data-type';
import { map } from 'rxjs/operators';
import { stringType } from './ast/data-type/string-type';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  constructor(
    private recordTypes: RecordTypeService,
    private optionTypes: OptionTypeService
  ) {}

  getAll(): Observable<DataType[]> {
    return combineLatest(
      this.optionTypes.getAll(),
      this.recordTypes.getAll()
    ).pipe(
      map(([options, records]) => [...options, ...records, stringType])
    );
  }
}
