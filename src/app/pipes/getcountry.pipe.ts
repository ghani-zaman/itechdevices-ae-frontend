import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'getcountry'
})
export class GetcountryPipe implements PipeTransform {
  countryList = environment.countriesList;
  transform(value: any): any {
    const country = this.countryList.filter((data) => data.Code === value);
    if (country.length > 0) {
      return country[0].Name;
    } else {
      return value;
    }
  }

}
