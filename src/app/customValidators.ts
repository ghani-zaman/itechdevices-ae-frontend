import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
export function expiryDateValidator(): ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null => {
      const curDate = new Date();
      const curyear = curDate.getFullYear();
      const curmonth = curDate.getMonth() + 1;
      const expiry: string | null = control.value;
      if(expiry === null || expiry=== '') {

          return {expiryDate: true}
      }
      const array = expiry.split("/");
      const month: number = +array[0];

      const year:number = +array[1];

      if(year < curyear) {

          return {expiryDate: true}
      } else {
          if(year == curyear && month < curmonth) {

              return {expiryDate: true}
          }
      }
      // console.log('valid')
      return null;
  }
}

export function positiveNumberValidatior(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;
      if(value === null || value ==='') {
        return {positiveNumber: true };
      }
      let valid = false;
      let pattren = /^\d+$/;
      valid = pattren.test(value)
    if (!valid) { return {positiveNumber: true }; } else { return null;}

  }
}

export function creditCardValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = (control.value === null)? control.value : control.value.toString();
      if(value === null || value ==='') {
        return {creditCard: true };
      }
      let valid = false, cardNumber = value.replace(/ +/g, '').replace(/-+/g, '');

    let numDigits = cardNumber.length;
    if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {

      let sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
      do {
        digit = parseInt(cardNumber.charAt(i));
        luhn += (pos++ % 2 == 0) ? digit * 2 : digit;
      } while (--i >= 0)

      for (i = 0; i < luhn.length; i++) {
        sum += parseInt(luhn.charAt(i));
      }
      valid = sum % 10 == 0;
    }
    if (!valid) { return {creditCard: true }; } else { return null;}

  }
}
