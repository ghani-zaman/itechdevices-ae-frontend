import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImageCtaComponent } from './full-image-cta.component';

describe('FullImageCtaComponent', () => {
  let component: FullImageCtaComponent;
  let fixture: ComponentFixture<FullImageCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullImageCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullImageCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
