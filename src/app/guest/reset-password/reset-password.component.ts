import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService : AuthService , private notificationService : NotificationService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid)
      return;
    console.log(this.resetPasswordForm.value);

    this.authService.resetPassword(this.resetPasswordForm.value.email).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.showSuccess("הסיסמה נשלחה לטלפון הטלגרם שלך!", "");
        this.router.navigate(['auth']);
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 430:
            this.notificationService.showError("שם משתמש כבר קיים, השתמש בשם אחר", "טעות");
            break;
          case 409:
            this.notificationService.showError("כתובת דואר אלקטרוני כבר קיימת, השתמש באחת אחרת", "טעות");
            break;
        }
      }
    });
  }

}
