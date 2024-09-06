import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.css']
})
export class TopCategoriesComponent implements OnInit {
  @Input() category: any = null;
  @Input() subcategories: any = [];
  env = environment;
  constructor() { }

  ngOnInit(): void {

  }

}
