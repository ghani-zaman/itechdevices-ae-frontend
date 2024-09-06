import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCheckoutNewComponent } from './simple-checkout-new.component';

describe('SimpleCheckoutNewComponent', () => {
  let component: SimpleCheckoutNewComponent;
  let fixture: ComponentFixture<SimpleCheckoutNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCheckoutNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCheckoutNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
