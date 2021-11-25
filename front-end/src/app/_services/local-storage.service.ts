import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get(key: string): any {
    let value : any | null = localStorage.getItem(key);
    if(value) value = JSON.parse(value);
    return value
  }

  public set(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public update(key: string, value: any): any {
    if(this.get(key) !== null)
    {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  public delete(key: string): any {
    let oldValue  : any|null = localStorage.getItem(key);
    if(oldValue !== null) localStorage.removeItem(key);
  }
}
