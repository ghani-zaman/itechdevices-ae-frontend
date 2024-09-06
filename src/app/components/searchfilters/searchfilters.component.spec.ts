import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfiltersComponent } from './searchfilters.component';

describe('SearchfiltersComponent', () => {
  let component: SearchfiltersComponent;
  let fixture: ComponentFixture<SearchfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
