import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaFormComponent } from './rma-form.component';

describe('RmaFormComponent', () => {
  let component: RmaFormComponent;
  let fixture: ComponentFixture<RmaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
