import { Directive } from '@angular/core';
import {AbstractControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";

@Directive({
  selector: '[appDifferentPassword]'
})
export class DifferentPasswordDirective {

  constructor() { }

}

/** A hero's name can't match the hero's alter ego */
export const differentPasswordValidator: ValidatorFn = (control: AbstractControl): Validators | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  return password && passwordConfirm && password.value !== passwordConfirm.value ? { differentPassword: true } : null;
};
