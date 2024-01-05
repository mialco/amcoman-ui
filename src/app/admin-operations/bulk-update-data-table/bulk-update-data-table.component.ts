import { Component, OnInit } from '@angular/core';
import { BulkUpdateService } from '../bulk-update/bulk-update.service';
import { OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bulk-update-data-table',
  templateUrl: './bulk-update-data-table.component.html',
  styleUrls: ['./bulk-update-data-table.component.css']
})
export class BulkUpdateDataTableComponent implements OnInit, OnDestroy {

  dataSource : Array<any> = [];
  subscription !: Subscription;
  
  @Output('onRowSelection') onRowSelection : EventEmitter<any> = new EventEmitter<any>();
  @Output('onDataSourceChange') onDataSourceChange : EventEmitter<any> = new EventEmitter<any>();

  constructor(private bulkUpdateService : BulkUpdateService) { }

  ngOnInit() {

    this.subscription=  this.bulkUpdateService.dataSource.subscribe((dataSource)=>{
      this.dataSource = dataSource;
      this.onDataSourceChange.emit(dataSource);
    });
  }

  onRowSelec(row : any){
    row.isSelected = !row.isSelected;
    this.onRowSelection.emit(row);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
