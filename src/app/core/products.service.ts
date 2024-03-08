import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG , IAppConfig} from '../app-config';
import { HttpClient } from '@angular/common/http';
import { ProductData } from './product.interface';
import { Observable } from 'rxjs';
import { TreeNode } from './tree-node.interface';
import { CategoryGroup } from './category-group';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Params } from '@angular/router';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient ) {

   }

  private pageSizeDefault: number = 3;
  private baseUrl = `${this.config.apiEndpoint}/products`;
  private pageCounter:number = 0;
  private pageSize:number = this.pageSizeDefault;
  private totalPages : number = 0;

  // getMockProduct():ProductData
  // {
  //   // var p= new ProductData();
  //   // p.description = "Description 1";
  //   // p.name = "Product 1";
  //   // p.link = "http://mialco.com";
  //   // return p;
  // }

  treeDataSource = new MatTreeNestedDataSource<TreeNode>();
  selectedNodes : Map<number, boolean>  = new Map<number, boolean>();
  selectedGroups : Map<number,boolean> = new Map  <number,boolean>();

  getPageNextCounter():number{
    return ++this.pageCounter;
  }
  getPageCounter():number{
    return this.pageCounter;
  }
  getPageSize():number{
    return this.pageSize;
  }


  getProduct(productId:number):Observable<ProductData>{
    return  this.http.get<ProductData>(`${this.baseUrl}/${productId}`);
  }

  getProducts (page:number, pageSize:number, params:Params) :Observable<ProductData[]>  {
    console.log('A call was made to get products')
    var products  : ProductData[] = new Array<ProductData>;
      //var url:string = `${this.baseUrl}?pageindex=${page}&pagesize=${pageSize}`
      var url:string = `${this.baseUrl}?pageindex=${page}&pagesize=${pageSize}`
      var url:string = `${this.baseUrl}/list`
      let queryString = new URLSearchParams(params).toString();
      console.log('URL for getting products: ' + url + ' Params: ' + queryString);
      
      var result = this.http.get<ProductData[]>(url, params);

      return  result;
  }

  getCategoryTree(groupIdsFilter: number[]):Observable<TreeNode[]>{ 
    let groupsFilter = '';
    if (groupIdsFilter.length > 0) {
      groupsFilter = groupIdsFilter.join(',');
    }
    return this.http.get<TreeNode[]>(this.buildCategoryTreeApiUrl(groupsFilter));
  }

  /// This method will be called when the user selects a category group in the category groups component.
  updateCategoryTreeOnGroupChange() {
    //We build an array of group ids that are selected
    let selectedGroupIds: number[] = [];
    this.selectedGroups.forEach((value: boolean, key: number) => {
      console.log('Key: ' + key + ' Value: ' + value);
      if (value) {
        
        selectedGroupIds.push(key);
      }
    });
    console.log('Selected groups for filtering categories: ' + JSON.stringify(selectedGroupIds));
    //We call the getCategoryTree method with the new group ids filter
    this.getCategoryTree(selectedGroupIds).subscribe(data => {  this.treeDataSource.data = data; 
    
  })
    
    console.log('Get category Trees with  Selected groups: ' +JSON.stringify( selectedGroupIds));  

  }

  getCategoryGroupsView():Observable<CategoryGroup[]>{
    return this.http.get<CategoryGroup[]>(this.buildCatgoryGroupsViewApiUrl());
  } 


  private buildCategoryTreeApiUrl(groupsFilter: string):string {
    return `${this.config.apiEndpoint}/categories/tree?groupidsfilter=${groupsFilter}`;
  }

  private buildCatgoryGroupsViewApiUrl():string {
    return `${this.config.apiEndpoint}/categories/groups/view`;
  }


}
