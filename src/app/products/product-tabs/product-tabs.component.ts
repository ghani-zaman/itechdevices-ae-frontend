import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.sass']
})
export class ProductTabsComponent implements OnInit {

  @Input() data: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
