import { Injectable } from '@angular/core';
import { CrudService } from './crud-service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

interface Model {
  id: string;
}

@Injectable()
export abstract class DataService<T extends Model> implements CrudService<T> {

  abstract readonly Model;

  protected models: T[] = [];
  protected models$: BehaviorSubject<T[]>;

  constructor(
    protected storage: LocalStorageService
  ) {}

  create(t: T): Observable<T> {
    this.models.push(t);
    this.storage.save(t);
    this.models$.next(this.models);
    return of(t);
  }

  get(id: string): Observable<T> {
    return of(this.models.find(t => t.id === id));
  }

  getAll(): Observable<T[]> {
    console.log(`data.service<${this.Model.constructor.name}> getAll()`, !this.models$);
    if (!this.models$) {
      this.models = this.storage.getAll(this.Model);
      this.models$ = new BehaviorSubject(this.models);
    }

    return this.models$;
  }

  update(t: T): Observable<T> {
    this.storage.save(t);
    return of(t);
  }

  delete(t: T): Observable<T> {
    this.storage.remove(t);
    const index = this.models.findIndex(_t => _t.id === t.id);
    if (index >= 0) {
      this.models.splice(index, 1);
      this.models$.next(this.models);
      return of(t);
    }

    return of(null);
  }
}
