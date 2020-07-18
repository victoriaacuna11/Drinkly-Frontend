import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';


@Directive({
    selector: '[passwordValid]',
    providers: [{ provide: NG_VALIDATORS, useExisting: passwordValidator, multi: true }]
})

export class passwordValidator{

  /**
   * Valida que un campo en un input siga un patrón especificado. Usado para la contraseña 
   * en los validators del componente register y edit-user
   * @param {RegExp} regex El patrón según el cual se evalúa
   * @param {ValidationErrors} error el error que debe retornar si no cumple el patrón
   * @returns {null} si cumple el patrón
   * @returns { [key: string]: any } el error si no cumple el patrón
   */
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