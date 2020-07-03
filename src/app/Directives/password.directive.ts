import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';


@Directive({
    selector: '[passwordValid]',
    providers: [{ provide: NG_VALIDATORS, useExisting: passwordValidator, multi: true }]
})
export class passwordValidator{

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }      
          const valid = regex.test(control.value);      
          return valid ? null : error;
        };
      }


}