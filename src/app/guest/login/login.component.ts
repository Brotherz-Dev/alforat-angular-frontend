import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { MyErrorStateMatcher } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = true;

  matcher = new MyErrorStateMatcher();

  loginForm: FormGroup;
  loading: boolean = false;
  submitted = false;
  returnUrl: string = '';
  public jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private storageService: StorageService, private notificationService: NotificationService , private spinner: NgxSpinnerService ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'app';
  }

  get f() { return this.loginForm.controls; }

  async login() {
    if (!this.loginForm.valid) return;
    this.loading = true;
    
    try {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (res) => {
          console.log(res);
          const user = this.jwtHelper.decodeToken(res.access_token);
          this.storageService.setToken(res);
          if (!user.isVerified) {
            this.notificationService.showInfo("כתובת האימייל שלך לא מאומתת! אנא צור קשר עם המנהל", "מידע");
          }
          else {
            this.notificationService.showSuccess("נכנס בהצלחה", "");
            this.router.navigateByUrl(this.returnUrl);
            this.loading = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          switch (err.status) {
            case 401:
              this.notificationService.showError("האימייל או הסיסמה שגויים, אנא נסה שוב", "טעות");
              break;
            case 403:
              this.notificationService.showError(err.message, "טעות");
              break;
          }
        }
      });
    } catch (err) {
      this.notificationService.showError('', "טעות");
      this.loading = false;
    } finally {
      this.loading = false;
    }

  }

}
