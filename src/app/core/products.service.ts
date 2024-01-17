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
  private baseUrl = 'https://localhost:7150/api/Products';

  // getMockProduct():ProductData
  // {
  //   // var p= new ProductData();
  //   // p.description = "Description 1";
  //   // p.name = "Product 1";
  //   // p.link = "http://mialco.com";
  //   // return p;
  // }

  getProduct():Observable<ProductData>{
    return  this.http.get<ProductData>(`${this.baseUrl}/1`);
  }

}
