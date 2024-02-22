import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTreeComponent } from './side-menu-tree.component';

describe('SideMenuTreeComponent', () => {
  let component: SideMenuTreeComponent;
  let fixture: ComponentFixture<SideMenuTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideMenuTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
