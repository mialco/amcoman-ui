import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateDisclosureComponent } from './affiliate-disclosure.component';

describe('AffiliateDisclosureComponent', () => {
  let component: AffiliateDisclosureComponent;
  let fixture: ComponentFixture<AffiliateDisclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateDisclosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
