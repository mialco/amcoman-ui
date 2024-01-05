import { Component, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { ENVIRONMENT } from "../../app-config";
import { BulkUpdateService } from "../bulk-update/bulk-update.service";

import { OnDestroy } from "@angular/core";
//import { ISubscription } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "bulk-update-filter",
  templateUrl: "./bulk-update-filter.component.html",
  styleUrls: ["./bulk-update-filter.component.css"]
})
export class BulkUpdateFilterComponent implements OnInit, OnDestroy {
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

  isLiveEnvironment: boolean = false;
  categories!: Array<string>;
  filterOptions: any;
  subscription! : Subscription;
  constructor(private bulkUpdateService: BulkUpdateService) {}

  ngOnInit() {
    //Initially load from test environment
    this.environmentChanged("test");
    this.resetFilterOptions();
    this.subscription = this.bulkUpdateService.categories.subscribe(categories => {
      this.categories = [...categories];
    });
  }

  environmentChanged(environment: string) {
    this.bulkUpdateService.onEnvionmentChange(
      environment === "live" ? ENVIRONMENT.LIVE : ENVIRONMENT.TEST,
      () => {
        this.isLiveEnvironment = environment === "live";
        this.resetFilterOptions();
        this.onFilterChange.emit();
      }
    );
  }

  resetFilterOptions() {
    this.filterOptions = {
      selectedCategory: undefined,
      noImages: false,
      invalidImages: false,
      invalidLinks: false,
      generalSearch : ''
    };
  }

  onFilterDataChange(){
    this.bulkUpdateService.onFilterChange(this.filterOptions,()=>{
      this.onFilterChange.emit();
    });

    //I think this will not be required as whn api is available it will be handled by api only, so commenting as of now
    //this.bulkUpdateService.filter(this.filterOptions);

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
