import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimCatImage'
})
export class TrimCatImagePipe implements PipeTransform {

  transform(value: String): String {
    let data = value.replace(/[^a-zA-Z0-9]/g, '')
    return data.toLowerCase();
  }

}
