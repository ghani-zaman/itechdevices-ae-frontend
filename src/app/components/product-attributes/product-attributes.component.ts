import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.sass']
})
export class ProductAttributesComponent implements OnInit {
  @Input() list = [];
  constructor() { }

  ngOnInit(): void {
    // console.log('ll', this.list.length);
  }
  checkAttrbutesList(id, list, key): any {
    let exist = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
      if (id === list[i][key]) {
        exist = true;
      }
    }
    return exist;
  }

}
