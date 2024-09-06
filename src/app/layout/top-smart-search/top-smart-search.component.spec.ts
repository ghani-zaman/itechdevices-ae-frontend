import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSmartSearchComponent } from './top-smart-search.component';

describe('TopSmartSearchComponent', () => {
  let component: TopSmartSearchComponent;
  let fixture: ComponentFixture<TopSmartSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSmartSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSmartSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
