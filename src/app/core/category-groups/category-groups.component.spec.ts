import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupsComponent } from './category-groups.component';

describe('CategoryGroupsComponent', () => {
  let component: CategoryGroupsComponent;
  let fixture: ComponentFixture<CategoryGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
