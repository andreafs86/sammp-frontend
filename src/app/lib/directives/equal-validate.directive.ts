import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidateDirective), multi: true }
    ]
})
export class EqualValidateDirective implements Validator{

  constructor( @Attribute('btx-validate') public validateEqual: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
      


      return null;
  }

}
