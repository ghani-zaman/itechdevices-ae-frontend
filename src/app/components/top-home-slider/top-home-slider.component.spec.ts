import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHomeSliderComponent } from './top-home-slider.component';

describe('TopHomeSliderComponent', () => {
  let component: TopHomeSliderComponent;
  let fixture: ComponentFixture<TopHomeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHomeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
