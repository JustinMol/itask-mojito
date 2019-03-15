import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export declare type Form = {
  name: string
};

const FORMS = [
  { name: 'BugReport' },
];

@Injectable({
  providedIn: 'root'
})
export class FormService {

  getForms(): Observable<Form[]> {
    return of(FORMS);
  }

}
