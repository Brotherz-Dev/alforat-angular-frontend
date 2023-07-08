import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import CustomValidators from "src/app/custom-validators/custom-validators";
import { MyErrorStateMatcher } from "src/app/guest/register/register.component";
import { NotificationService } from "src/app/services/notification/notification.service";
import { UserService } from "src/app/services/user/user.service";
import { ResponseUserDto, UpdatePasswordDto, UpdateProfileDto } from "src/app/shared/user-dto/user-response";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  @Input()
  user: ResponseUserDto | undefined;

  selected_category_id: number = 0;
  loading: boolean = false;
  minLength = 8;
  maxLength = 40;
  matcher = new MyErrorStateMatcher();

  updatePasswordGroup: FormGroup;
  updateProfileGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private notificationService: NotificationService) {

    this.updatePasswordGroup = this.formBuilder.group({
      oldPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40)
      ]],
      newPassword: ['', [
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
      validators: [
        CustomValidators.match('newPassword', 'confirmPassword')
      ]
    });

    this.updateProfileGroup = this.formBuilder.group({
      phoneNumber: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telegramId: ['']
    });


  }

  ngOnInit() {

    this.updateProfileGroup = this.formBuilder.group({
      phoneNumber: [this.user?.phoneNumber],
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      telegramId: [this.user?.telegramId],
    });
    // this.resetFullNameGroupObj();
  }



  updatePassword() {
    if (this.updatePasswordGroup.invalid)
      return;
    if (this.updatePasswordGroup.get('oldPassword')?.value === this.updatePasswordGroup.get('newPassword')?.value) {
      this.notificationService.showError("אסור שהסיסמה החדשה תתאים לסיסמה הישנה", "טעות");
      return;
    }
    this.loading = true;

    const obj = {} as UpdatePasswordDto;
    obj.oldPassword = this.updatePasswordGroup.get('oldPassword')?.value;
    obj.newPassword = this.updatePasswordGroup.get('newPassword')?.value;
    obj.confirmPassword = this.updatePasswordGroup.get('confirmPassword')?.value;

    this.userService.updatePassword(obj).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.showSuccess("הסיסמה עודכנה בהצלחה", "");
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.log(err.message);
        switch (err.status) {
          case 409:
            this.notificationService.showError("הסיסמה שגויה, אנא נסה שוב", "טעות");
            break;
          case 430:
            this.notificationService.showError("הסיסמאות אינן תואמות. אנא בדוק את הקלט שלך", "טעות");
            break;
        }
      }
    });
  }
  updateProfile() {
    if (this.updateProfileGroup.invalid)
      return;

    this.loading = true;
    const obj = {} as UpdateProfileDto;

    obj.firstName = this.updateProfileGroup.get('firstName')?.value;
    obj.lastName = this.updateProfileGroup.get('lastName')?.value;
    if (this.updateProfileGroup.get('telegramId')?.value != "") {
      obj.telegramId = this.updateProfileGroup.get('telegramId')?.value;
    }
    if(this.updateProfileGroup.get('phoneNumber')?.value != ""){
      obj.phoneNumber = this.updateProfileGroup.get('phoneNumber')?.value;
    }
    this.userService.updateProfile(obj).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);
        this.notificationService.showSuccess("הפרופיל עודכן בהצלחה", "");
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.notificationService.showError("לא ניתן היה לעדכן את הפרופיל, אנא צור קשר עם התמיכה", "טעות");
      }
    });
  }
}
