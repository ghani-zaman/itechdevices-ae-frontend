import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMainMenuComponent } from './top-main-menu.component';
import * as jQuery from 'jquery';

describe('TopMainMenuComponent', () => {
  let component: TopMainMenuComponent;
  let fixture: ComponentFixture<TopMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




 // Catgeory Dropdown
 jQuery(document).ready(function () {

  jQuery(".menu-item-big").hover(function () {
    var isHovered = jQuery(this).is(":hover");
    if (isHovered) {
      jQuery(this).children("ul").stop().slideDown(300);
    } else {
      jQuery(this).children("ul").stop().slideUp(300);
    }
  });

});