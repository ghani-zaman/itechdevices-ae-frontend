import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFaqComponent } from './category-faq.component';

describe('CategoryFaqComponent', () => {
  let component: CategoryFaqComponent;
  let fixture: ComponentFixture<CategoryFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
