import { Directive } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appForbiddenAge]'
})
export class ForbiddenAgeDirective {

  constructor() { }

}

export function forbiddenAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date();
    let eighteen_year_ago = `${date.getFullYear()-18}-${date.getMonth()+1}-${date.getDate()}`

    return Date.parse(control.value) > Date.parse(eighteen_year_ago) ? {forbiddenAge: {value: true}} : null;
  };
}
