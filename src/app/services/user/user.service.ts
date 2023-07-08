import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUserDto, UpdatePasswordDto, UpdateProfileDto } from 'src/app/shared/user-dto/user-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getProfile() : Observable<ResponseUserDto>{
    return this.http.get<ResponseUserDto>(`${environment.apiUrl}/user/profile`);
  }

  updatePassword(password : UpdatePasswordDto ) : Observable<Boolean>{
    return this.http.patch<Boolean>(`${environment.apiUrl}/user/updatepassword` , password);
  }

  updateProfile(obj : UpdateProfileDto ) : Observable<ResponseUserDto>{
    return this.http.patch<ResponseUserDto>(`${environment.apiUrl}/user/updateProfile` , obj);
  }
}
