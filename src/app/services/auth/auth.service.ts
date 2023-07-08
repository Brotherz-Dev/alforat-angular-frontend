import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/shared/shared.module';

import { CreateUserDto, ResponseUserDto } from 'src/app/shared/user-dto/user-response';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, private readonly storage: StorageService) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const user: JSON = <JSON><unknown>{
      "email": email,
      "password": password
    }
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, user);
  }

  confirmEmail(email: string, token: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${environment.apiUrl}/auth/confirm-email?email=${email}&token=${token}`);
  }

  resetPassword(email: string): Observable<Boolean> {
    const user: JSON = <JSON><unknown>{
      "email": email
    }
    return this.http.post<Boolean>(`${environment.apiUrl}/auth/resetpassword`, user);
  }

  resendEmailConfirmation(): Observable<Boolean> {
    return this.http.get<Boolean>(`${environment.apiUrl}/auth/resend-confirm-email`);
  }

  recoverypassword(email: string, token: string, code: string , value: any) : Observable<Boolean>  {
    return this.http.patch<Boolean>(`${environment.apiUrl}/auth/recoverypassword?email=${email}&token=${token}&code=${code}`, value);
  }
  register(value : CreateUserDto) : Observable<ResponseUserDto>  {
    return this.http.post<ResponseUserDto>(`${environment.apiUrl}/auth/register`, value);
  }


  logout() {
    this.storage.removeToken();
    this.router.navigateByUrl('auth', { replaceUrl: true });
  }
}
