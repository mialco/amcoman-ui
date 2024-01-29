import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuDynamicComponent } from './side-menu-dynamic.component';

describe('SideMenuDynamicComponent', () => {
  let component: SideMenuDynamicComponent;
  let fixture: ComponentFixture<SideMenuDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideMenuDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
