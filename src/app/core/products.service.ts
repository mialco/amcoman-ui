import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG , IAppConfig} from '../app-config';
import { HttpClient } from '@angular/common/http';
import { ProductData } from './product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient) { }

  getProduct():ProductData
  {
    var p= new ProductData();
    p.description = "Description 1";
    p.name = "Product 1";
    p.link = "http://mialco.com";
    return p;
  }

}
