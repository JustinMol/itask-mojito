import { Observable } from 'rxjs';
import { Type } from '@angular/core';

export interface CrudService<T> {
    create(t: T): Observable<T>;
    get(id: string): Observable<T>;
    getAll(model: Type<T>, ): Observable<T[]>;
    update(t: T): Observable<T>;
    delete(t: T): Observable<T>;
}
