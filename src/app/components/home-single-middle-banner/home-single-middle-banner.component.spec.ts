import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSingleMiddleBannerComponent } from './home-single-middle-banner.component';

describe('HomeSingleMiddleBannerComponent', () => {
  let component: HomeSingleMiddleBannerComponent;
  let fixture: ComponentFixture<HomeSingleMiddleBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSingleMiddleBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSingleMiddleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
