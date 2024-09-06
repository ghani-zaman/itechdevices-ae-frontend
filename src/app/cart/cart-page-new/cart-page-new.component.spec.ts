import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageNewComponent } from './cart-page-new.component';

describe('CartPageNewComponent', () => {
  let component: CartPageNewComponent;
  let fixture: ComponentFixture<CartPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPageNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
