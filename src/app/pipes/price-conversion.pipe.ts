import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceConversion'
})
export class PriceConversionPipe implements PipeTransform {

  transform(product: any, condition: any): any{
    // console.log(condition);
    if (product?.discount !== null && product?.discount !== 0) {
      return  ((product[condition] * 100) / (100 - product.discount));

    }else {
      return product[condition];
    }
  }

}
