import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatmapComponent } from './catmap.component';

describe('CatmapComponent', () => {
  let component: CatmapComponent;
  let fixture: ComponentFixture<CatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
