import { Injectable, Type } from '@angular/core';
import { LocalStorageService as AngularStorageService } from 'angular-2-local-storage';
import { plainToClass, classToPlain } from 'class-transformer';
import 'reflect-metadata';

const StorableMetadataKey = Symbol('Storable');

interface StorableOptions {
  id(t: any): string;
  key: string;
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private storage: AngularStorageService
  ) {}

  getAll<T>(Class: Type<T>): T[] {
    const options = this.getOptions(Class);
    const keys = this.storage.keys().filter(k => k.startsWith(options.key));
    return keys.map(k => {
      const value = this.storage.get(k);
      return plainToClass(Class, value);
    });
  }

  save<T>(t: T): void {
    if (!t || !t.constructor) throw new Error(`Cannot save value to store: ${t}`);

    const options = this.getOptions(t.constructor);
    const key = options.key + options.id(t);
    this.storage.set(key, classToPlain(t));
  }

  remove<T>(t: T): void {
    if (!t || !t.constructor) throw new Error(`Cannot remove value from store: ${t}`);

    const options = this.getOptions(t.constructor);
    const key = options.key + options.id(t);
    this.storage.remove(key);
  }

  private getOptions<T>(Class: Type<T> | Function): StorableOptions {
    const options = Reflect.getMetadata(StorableMetadataKey, Class);
    if (!options) throw new Error(`Class '${Class.name}' is not Storable`);
    
    return options;
  }
}

export function Storable(options: StorableOptions) {
  return Reflect.metadata(StorableMetadataKey, options);
}
