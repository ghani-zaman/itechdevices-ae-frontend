import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-menu-item-li]',
  templateUrl: './menu-item-li.component.html',
  styleUrls: ['./menu-item-li.component.css']
})
export class MenuItemLiComponent implements OnInit {
  @Input() data: any =  null;
  constructor() {
    // console.log(this.data.childrens);
  }

  ngOnInit(): void {
  }

}
