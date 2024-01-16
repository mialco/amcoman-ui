import { Component, Inject, OnInit } from '@angular/core';
import { ProductData } from '../product.data';
import { ProductsService } from '../products.service'

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'

})
export class ProductDetailsComponent implements OnInit {

  constructor (@Inject (ProductsService) private prs : ProductsService){
    this.productData = new ProductData();
  }
  ngOnInit(){ 
    this.productData = this.prs.getProduct()  
  }


  productData:ProductData;


}
