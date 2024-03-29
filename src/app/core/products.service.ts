import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG , IAppConfig} from '../app-config';
import { HttpClient } from '@angular/common/http';
import { ProductData } from './product.interface';
import { Observable } from 'rxjs';

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

}
