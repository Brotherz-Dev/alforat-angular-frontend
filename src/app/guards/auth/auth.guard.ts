import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private readonly storage : StorageService , private notificationService : NotificationService) {
  }
  async canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ) {
  
      const token = this.storage.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token) && this.jwtHelper.decodeToken(token)) {
        const isVerified = this.jwtHelper.decodeToken(token).isVerified;
        if(!isVerified){
          this.notificationService.showInfo("כתובת האימייל שלך לא מאומתת! אנא צור קשר עם המנהל", "מידע");
          this.router.navigate(['auth']);
        }
        return true;
      }
      this.notificationService.showInfo("אנא התחבר שוב!", "מידע");
      this.router.navigate(['auth'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
  }
}

