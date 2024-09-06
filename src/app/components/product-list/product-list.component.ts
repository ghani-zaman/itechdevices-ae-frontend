import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  host: { ngSkipHydration: 'true' },
})
export class ProductListComponent implements OnInit {
  @Input() products = [];
  @Input() total = -1;
  @Input() cpage = 1;
  @Input() limit = 10;
  @Output() pageChangeEvent = new EventEmitter<any>();
  @Output() changeOrderEvent = new EventEmitter<any>();
  @Input() loading = true;
  @Input() sortOrder: any = 'p.id DESC';
  grid = true;
  constructor() {}

  ngOnInit(): void {}

  changePage($event): void {
    // // console.log($event);
    this.pageChangeEvent.emit($event);
  }

  changeOrder($event): void {
    this.changeOrderEvent.emit($event);
  }

  toggleGrid(): void {
    this.grid = true;
  }

  toggleList(): void {
    this.grid = false;
  }
}
