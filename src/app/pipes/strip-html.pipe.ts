import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string): any {
    const val = value.replace(/<.*?>/g, '')
    return val.replace(/&(nbsp|amp|quot|lt|gt);/g, ''); // replace tags
  }

}
