import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG , IAppConfig} from '../app-config';
import { HttpClient } from '@angular/common/http';
import { ProductData } from './product.interface';
import { Observable } from 'rxjs';
import { TreeNode } from './tree-node.interface';
import { CategoryGroup } from './category-group';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient) { }
  private baseUrl = `${this.config.apiEndpoint}/products`;
  
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

  getProduct(productId:number):Observable<ProductData>{
    return  this.http.get<ProductData>(`${this.baseUrl}/${productId}`);
  }

  getProducts (page:number, pageSize:number) :Observable<ProductData[]>  {
    console.log('A call was made to get products')
    var products  : ProductData[] = new Array<ProductData>;
      var url:string = `${this.baseUrl}?pageindex=${page}&pagesize=${pageSize}`
      var result = this.http.get<ProductData[]>(url)

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
      if (value) {
        selectedGroupIds.push(key);
      }
    });
    //We call the getCategoryTree method with the new group ids filter
    this.getCategoryTree(selectedGroupIds).subscribe(data => {  this.treeDataSource.data = data; })
    
    console.log('Selected groups: ' + selectedGroupIds);  

  }

  getCategoryGroupsView():Observable<CategoryGroup[]>{
    return this.http.get<CategoryGroup[]>(this.buildCatgoryGroupsViewApiUrl());
  } 


  private buildCategoryTreeApiUrl(groupsFilter: string):string {
    return `${this.config.apiEndpoint}/categories/tree?groups=${groupsFilter}`;
  }

  private buildCatgoryGroupsViewApiUrl():string {
    return `${this.config.apiEndpoint}/categories/groups/view`;
  }


}
