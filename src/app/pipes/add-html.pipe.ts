import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addHtml'
})
export class AddHtmlPipe implements PipeTransform {

  transform(value: string): string {
    return value + '.html';
  }

}
