import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmlSanitizer'
})
export class HtmlSanitizerPipe implements PipeTransform {
  constructor( private ds: DomSanitizer) {}
  transform(value: any): any {
    return this.ds.bypassSecurityTrustHtml(value);
  }

}
