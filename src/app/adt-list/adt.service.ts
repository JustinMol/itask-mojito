import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export declare type ADT = {
  name: string
};

const ADTS: ADT[] = [
  { name: 'BugSeverity' }
];

@Injectable({
  providedIn: 'root'
})
export class AdtService {

  getAdts(): Observable<ADT[]> {
    return of(ADTS);
  }

  addAdt(adt: ADT): void {
    ADTS.push(adt);
  }

}
