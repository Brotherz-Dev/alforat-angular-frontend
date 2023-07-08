import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, catchError, throwError } from "rxjs";
import { NotificationService } from "../../notification/notification.service";
import { AuthService } from "../auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    public jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService, private notificationService: NotificationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = request;
        return next.handle(request).pipe(catchError(err => {
            switch (err.status) {
                case 401:
                    if (!authReq.url.includes('auth')) {
                        this.authService.logout();
                        this.router.navigate(['auth']);
                    }
                    break;
                case 403:
                    this.router.navigate(['auth']);
                    break;
                case 429:
                    this.notificationService.showError("אנא המתן מעט", "טעות");
                    break;
                case 500:
                    this.notificationService.showInfo(err.error.message, "Information");
                    this.notificationService.showError("נמצאה שגיאה, אנא צור קשר עם התמיכה!", "טעות");
                    break;
                case 400:
                    this.notificationService.showError("משהו חסר, בדוק את הקלט שלך ונסה שוב, אם זה עדיין קורה, אנא צור קשר עם התמיכה!", "טעות");
                    this.notificationService.showInfo(err.error.message, "Information");
                    break;

            }
            const error = err;
            return throwError(error);
        }))
    }
}