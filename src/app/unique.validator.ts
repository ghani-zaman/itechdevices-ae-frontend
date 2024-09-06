import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { UserService } from './services/user.service';

export function UniqueValidator(userService: UserService, update = false): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.isEmailTaken(control.value, update).pipe(
      debounceTime(3000),
      map(resp => (!resp.data.isAvailable ? { uniqueValidator: true } : null)),
      catchError(() => of(null))
    );
  };
}
