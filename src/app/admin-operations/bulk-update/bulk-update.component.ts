import { Component, OnInit} from "@angular/core";
import { BulkUpdateService } from "./bulk-update.service";
import { ViewChild } from "@angular/core";
import { PaginationComponent } from "../ui-components/pagination/pagination.component";
@Component({
  selector: "bulk-update",
  templateUrl: "./bulk-update.component.html",
  styleUrls: ["./bulk-update.component.css"],
  providers: [BulkUpdateService]
})
export class BulkUpdateComponent implements OnInit {
  selectedRows: Array<number> = [];
  constructor(public bulkUpdateService: BulkUpdateService) {}

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent = new PaginationComponent;
  ngOnInit() {}

  onPageChanges(pageData: { page: any; pageSize: any; }) {
    // call bulkUpdateService to change the data source as per the update page and pageSize
    this.bulkUpdateService.onPaginationChnage({
      page: pageData.page,
      pageSize: pageData.pageSize
    });
  }

  onFilterChange() {
    //It can be possible that pagination is yet not ready to not available due to empty dataSource
    if(this.pagination){
      this.pagination.resetCurrentPage();
    }
    
  }
  onTableRowSeletion(row: { prodId: number; isSelected: any; }) {
    let rowIndex: number = this.selectedRows.indexOf(row.prodId);
    if (rowIndex === -1 && row.isSelected) {
      //If the prodID does not already exist in the array than only add it
      this.selectedRows.push(row.prodId);
    } else if (rowIndex > -1 && !row.isSelected) {
      //If the prodID already exist in the array than only delete it
      this.selectedRows.splice(rowIndex, 1);
    }
  }

  onDataSourceChange(dataSource: any) {
    //clears the selection as the dataset chnaged
    this.selectedRows = [];
  }
}
