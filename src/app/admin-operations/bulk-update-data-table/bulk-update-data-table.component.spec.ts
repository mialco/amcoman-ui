import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUpdateDataTableComponent } from './bulk-update-data-table.component';

describe('BulkUpdateDataTableComponent', () => {
  let component: BulkUpdateDataTableComponent;
  let fixture: ComponentFixture<BulkUpdateDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUpdateDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUpdateDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
