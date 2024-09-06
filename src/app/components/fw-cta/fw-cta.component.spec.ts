import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FwCtaComponent } from './fw-cta.component';

describe('FwCtaComponent', () => {
  let component: FwCtaComponent;
  let fixture: ComponentFixture<FwCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FwCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FwCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
