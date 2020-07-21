import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';


@Directive({
    selector: '[isAdult]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true }]
})
export class AgeValidatorDirective implements Validator {

    /**
     * Valida que la fecha que se le pasa corresponde a una persona mayor de edad. Usado en los validators del componente
     * register
     * @param {AbstractControl} control el input que contiene la fecha en el form
     * @returns {null} si es mayor de edad
     * @returns {[key: string] : any} el error si es menor de edad
     */
    validate(control: AbstractControl): {[key: string] : any} | null {
        let aux = new Date(control.value);
        var dif_ms = Date.now() - aux.getTime();
        var age_dt = new Date(dif_ms);
        var final_age = Math.abs(age_dt.getUTCFullYear() - 1970);
      
        return  final_age < 18 ? { 'underAge' : true } : null;
    }
}