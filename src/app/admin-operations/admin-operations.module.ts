import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { BulkUpdateFilterComponent } from './bulk-update-filter/bulk-update-filter.component';
import { FormsModule } from '@angular/forms';
import { BulkUpdateService } from './bulk-update/bulk-update.service';
import { DataManagerService } from './ui-components/data-manager.service';
import { BulkUpdateDataTableComponent } from './bulk-update-data-table/bulk-update-data-table.component';
import { CoreModule } from '../core/core.module';
import { PaginationComponent } from './ui-components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule
  ],
  declarations: [BulkUpdateComponent, BulkUpdateFilterComponent, BulkUpdateDataTableComponent, PaginationComponent],
  exports : [BulkUpdateComponent],
  providers : [DataManagerService]
})
export class AdminOperationsModule { }
