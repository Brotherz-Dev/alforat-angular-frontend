import { ValidatorFn, AbstractControl } from "@angular/forms";


export default class CustomValidators {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  // // max length
  // public static maxLength(max: number): ValidatorFn | any {
  //   return (control: AbstractControl[]) => {
  //     if (!(control instanceof Array)) return;
  //     return control.length > max ? { maxLength: true } : null;
  //   }
  // }

  // // min length
  // public static minLength(min: number): ValidatorFn | any {
  //   return (control: AbstractControl[]) => {
  //     if (!(control instanceof Array)) return;
  //     return control.length < min ? { minLength: true } : null;
  //   }
  // }

}
