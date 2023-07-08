import { Injectable } from '@angular/core';

const ACCESS_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(key: string, value: string) {
    localStorage.setItem(key,value);
  }
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  }

  get(key : string){
    return localStorage.getItem(key);
  }

  removeToken(): void {
     localStorage.removeItem(ACCESS_KEY);
  }

  clean(): void{
    localStorage.clear();
  }

  setToken(token : any): void{
    this.removeToken();
    localStorage.setItem(ACCESS_KEY , token?.access_token)
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(ACCESS_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}

