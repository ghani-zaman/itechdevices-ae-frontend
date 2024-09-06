import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {

  transform(value: string, length: number = 50): string{
    if (value.length > length) {
      return value.substr(0, length) + '...';
    } else {
      return value;
    }
  }

}
