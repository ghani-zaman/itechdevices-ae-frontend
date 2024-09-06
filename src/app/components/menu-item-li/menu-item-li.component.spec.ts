import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemLiComponent } from './menu-item-li.component';

describe('MenuItemLiComponent', () => {
  let component: MenuItemLiComponent;
  let fixture: ComponentFixture<MenuItemLiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemLiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
