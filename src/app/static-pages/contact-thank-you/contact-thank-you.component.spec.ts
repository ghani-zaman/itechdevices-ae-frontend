import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactThankYou } from './contact-thank-you.component';

describe('ContactThankYou', () => {
  let component: ContactThankYou;
  let fixture: ComponentFixture<ContactThankYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactThankYou ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactThankYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
