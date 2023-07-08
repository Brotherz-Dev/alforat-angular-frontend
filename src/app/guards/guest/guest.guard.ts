import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/services/storage-service/storage.service';


@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private readonly s: StorageService) {
  }
  async canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const token = this.s.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token)) {
        this.router.navigate(['app']);
        return false;
      }
      return true;
  }
}


