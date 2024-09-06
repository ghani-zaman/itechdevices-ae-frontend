import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytraceComponent } from './paytrace.component';

describe('PaytraceComponent', () => {
  let component: PaytraceComponent;
  let fixture: ComponentFixture<PaytraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaytraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
