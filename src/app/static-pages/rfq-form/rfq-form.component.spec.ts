import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqForm } from './rfq-form.component';

describe('RfqForm', () => {
  let component: RfqForm;
  let fixture: ComponentFixture<RfqForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
