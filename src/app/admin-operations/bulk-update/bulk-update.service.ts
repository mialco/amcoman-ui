import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { APP_CONFIG, IAppConfig, ENVIRONMENT } from "../../app-config";
import { BehaviorSubject } from "rxjs";
//import { enableDebugTools } from "@angular/platform-browser/src/browser/tools/tools";
import { enableDebugTools } from "@angular/platform-browser";

import { MessageService, ErrorMessages } from "../../core/message.service";

@Injectable()
export class BulkUpdateService {
  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private http: HttpClient,
    private _messageService : MessageService
  ) {}

  categories: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<any>>([Array<any>]);

  dataSource: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]) ;

  filterOptions : any= {};

  pageSize : number=0;
  defaultPageSize : number=0;
  page : number=0;


  totalPages :  number=0; // just to display on pagination component

  environment!: ENVIRONMENT;

  onEnvionmentChange(env: ENVIRONMENT, successCallback: Function) {
    this.getCategories(successCallback);
    this.getProducts( successCallback,1,this.defaultPageSize);
  }

  private getEnvironmentURL() {
    if (this.environment === ENVIRONMENT.LIVE) {
      return this.config.apiEndpoint;
    }else{
      return this.config.testApiEndpoint;
    }
    
  }

  getCategories(successCallback: Function) {
    this.http.get<any>(
      this.getEnvironmentURL() + "category").subscribe(categories => {
      if(categories){
        this.categories.next(categories as Array<string>);
      }else{
        this.categories.next([] as Array<string>);
      }
      if(successCallback)successCallback();
    },(error)=>{
      this._messageService.parseErrorAndPush(error);
    });
  }

  getProducts(successCallback : Function,page : number, pageSize : number) {
    this.page = page || this.pageSize || 1;
    this.pageSize = pageSize || this.pageSize || 10;
    
    if (this.filterOptions.selectedCategory) {

        this.http
        .get<any>(
          this.getEnvironmentURL() + "aflproducts/" + encodeURIComponent(this.filterOptions.selectedCategory) + "/" + this.page + "/" + this.pageSize
        )
        .subscribe(envData => {
          if(envData && envData.aflProducts){
            this.dataSource.next(envData.aflProducts as Array<any>);
            this.totalPages = envData.pages;
            
          }else{
            this.dataSource.next([] as Array<any>);
            this.page = 0;
            this.totalPages = 0;
          }
          
          if(successCallback)successCallback();
        },(error)=>{
          this._messageService.parseErrorAndPush(error);
        });
    } else {
      
        this.dataSource.next([] as Array<any>);
        this.page = 0;
        this.totalPages = 0;
        if(successCallback)successCallback();
       
    }
  }

  onFilterChange(filterOptions: any,successCallback? : Function) {
    this.filterOptions = Object.assign({},filterOptions);
    //this.getProducts(successCallback,1,this.defaultPageSize);
    
  }
  onPaginationChnage(paginationData: { page: any; pageSize: any; },successCallback? : Function){

    //if new pagination data and the one service is having mismatched, load products as per the updated pagination data
    if(paginationData.page !==this.page || paginationData.pageSize !==this.pageSize)
    {
      //this.getProducts(successCallback,paginationData.page, paginationData.pageSize);
    }
  }

  
  //I think this will not be required as whn api is available it will be handled by api only, so commenting as of now
  // filter(filterOptions){
  //   let filteredDataSource : Array<any> =[];

  //   console.log(filterOptions);

  //   this.dataSource.value.forEach((data)=>{

  //     let isMatched :boolean = true;
  //     if(filterOptions.selectedCategory && data.category !== filterOptions.selectedCategory ){

  //       console.log(filterOptions.selectedCategory + "   "+data.category)
  //       isMatched = false;
  //     }
  //     // if(filterOptions.noImages && data.image){
  //     //   isMatched = false;
  //     // }
  //     // //yet to set data in product to verify whether the image is valid or not
  //     // if(filterOptions.invalidImages && data.isImageValid != false){
  //     //   isMatched = false;
  //     // }
  //     // //yet to set data in product to verify whether the Link is valid or not
  //     // if(filterOptions.invalidLinks && data.isLinkValid != false){
  //     //   isMatched = false;
  //     // }

  //     if(isMatched){
  //       filteredDataSource.push(Object.assign({},data)); //single level data copy
  //     }
  //   });

  //   this.dataSource.next(filteredDataSource);
  // }
}
