import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  
  @Input('totalPages') totalPages!: number; //will be useful if api is calculating total pages (if give it response readymade with pagination info

  //Will be useful if api only returns the totalRecords without -
  //- calculating total pages OR leaves all paginaation related calculation for UI
  @Input('totalRecords')
  totalRecords!: string; 
  @Output() onPageChanges : EventEmitter<any>= new EventEmitter();

  currentPage: number = 1;
  
  pageSize: number = 10;
  linksStatus: any = {
    first: true,
    last: true,
    prev: true,
    next: true
  };
  navigationLinks = NAVIGATION;
  constructor() {}

  ngOnInit() {
    if(!this.totalPages && this.totalRecords){
      this.totalPages =  Math.ceil(+this.totalRecords / this.pageSize);
    }else{
      
    }
    this.onPageNavigation();

  }

  onPageNavigation(navAction?: NAVIGATION) {
    //if navigation variable not passed, it will just refresh the links status. Switch status won't make any sense for such case

    
    let oldCurrentPageValue = this.currentPage;

    switch (navAction) {
      case NAVIGATION.FIRST:
        this.currentPage = 1;
        break;
      case NAVIGATION.LAST:
        this.currentPage = this.totalPages;
        break;
      case NAVIGATION.NEXT:
        this.currentPage = (this.currentPage !== this.totalPages) ? ++this.currentPage : this.currentPage;
        break;
      case NAVIGATION.PREV:
      this.currentPage = (this.currentPage !== 1) ? --this.currentPage : this.currentPage;
        break;

      default:
        break;
    }

    if (this.currentPage === 1) {
      this.linksStatus.first = false;
      this.linksStatus.prev = false;
    } else if (this.currentPage === this.totalPages) {
      this.linksStatus.last = false;
      this.linksStatus.next = false;
    }


    if(oldCurrentPageValue !== this.currentPage){
      let startIndex = (this.currentPage-1)*this.pageSize+1;
      let endIndex = this.currentPage*this.pageSize;
      this.onPageChanges.emit({
        page : this.currentPage,
        pageSize : this.pageSize, 
        startIndex : (this.currentPage-1)*this.pageSize+1,
        endIndex : this.currentPage*this.pageSize
      });
    }

  }

  resetCurrentPage(){
    this.currentPage = 1;
  }

}

export enum NAVIGATION {
  NEXT,
  PREV,
  FIRST,
  LAST
}
