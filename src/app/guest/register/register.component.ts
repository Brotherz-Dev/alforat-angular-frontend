import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomValidators from 'src/app/custom-validators/custom-validators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CreateUserDto } from 'src/app/shared/user-dto/user-response';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || form && form.submitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  loading: boolean = false;

  matcher = new MyErrorStateMatcher();

  minLength = 8;
  maxLength = 40;

  startDate = new Date(new Date().getFullYear() - 16, 1, 1);
  myFilter = (d: Date | null): boolean => {
    const year = (d || new Date()).getFullYear();
    // Prevent Saturday and Sunday from being selected.
    return year <= new Date().getFullYear() - 16;
  };



  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      telegramId: [''],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40)
      ]],
      // acceptTerms: [false, Validators.requiredTrue]

    }, {
      validators: [CustomValidators.match('password', 'confirmPassword')]
    });

  
  }



  ngOnInit(): void {

  }


  async register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const user = {} as CreateUserDto;
    user.firstName = this.registerForm.get('firstName')?.value;
    user.lastName = this.registerForm.get('lastName')?.value;
    user.username = this.registerForm.get('username')?.value;
    user.email = this.registerForm.get('email')?.value;
    user.password = this.registerForm.get('password')?.value;
    if (this.registerForm.get('telegramId')?.value != "") {
      user.telegramId = this.registerForm.get('telegramId')?.value;
    }
    if(this.registerForm.get('phoneNumber')?.value != ""){
      user.phoneNumber = this.registerForm.get('phoneNumber')?.value;
    }
    


    console.log(user);

    this.authService.register(user).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.showSuccess("נרשם בהצלחת", "");
        this.router.navigate(['auth']);
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
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




