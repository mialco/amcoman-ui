import { Component, Inject, OnInit } from '@angular/core';
import { ProductData } from '../product.interface';
import { ProductsService } from '../products.service'

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'

})
export class ProductDetailsComponent implements OnInit {

  constructor (@Inject (ProductsService) private prs : ProductsService){
    //this.productData = undefined ; //new ProductData();
  }
  ngOnInit(){ 
    this.prs.getProduct().subscribe((productData)=>{
      this.productData=productData;
    })  
  }


  productData:ProductData = 
   {
    id : 0,
    productName : '',
    description : '',
    price:0.,
    navigateUrl: '',
    imgUrl: '',
    additionalInfoTitle:'',
    additionalInfoUrl: '',
    advertiser:'',
    advertizerLinkID:'', 
    endDate:new Date(),
    imgAlt :'',
    imgDescription:'',
    isActive :true,
    linkCode:'',
    startDate:new Date(),
   }

 }
