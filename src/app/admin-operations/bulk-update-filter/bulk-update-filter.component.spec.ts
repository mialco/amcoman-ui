import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUpdateFilterComponent } from './bulk-update-filter.component';

describe('BulkUpdateFilterComponent', () => {
  let component: BulkUpdateFilterComponent;
  let fixture: ComponentFixture<BulkUpdateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUpdateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUpdateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
