import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Requis',
      invalidEmailAddress: 'Adresse e-mail invalide',
      invalidPassword: 'Le mot de passe doit avoir au moins 6 caractères.',
      minlength: `Longueur minimale ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } 
    else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]$/)) {
      return null;
    } 
    else {
      return { invalidPassword: true };
    }
  }
}
