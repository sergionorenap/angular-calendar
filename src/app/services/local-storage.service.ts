import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get<T>(key: string): T {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : undefined;
  }

  save<T>(key: string, value: T): boolean {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }

    return false;
  }

  delete<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);

    if (item) {
      localStorage.removeItem(key);
      return JSON.parse(item);
    }

    return undefined;
  }
}
