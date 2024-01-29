import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductData } from '../product.interface';
import { ProductsService } from '../products.service'
import { ActivatedRoute, Router} from '@angular/router'
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'

})
export class ProductDetailsComponent implements OnInit {

  constructor (@Inject (ProductsService) private prs : ProductsService, 
  private route:ActivatedRoute, private router: Router, private sanitizer : DomSanitizer){
  }

  
  ngOnInit(){ 

    const productId:number = this.route.snapshot.params['id'];

    this.prs.getProduct(productId).subscribe((productData)=>{
      this.productDescription=  productData.description; 
      this.productData=productData;
    })  
  }
  productDescription : string = '';
  get sanitizedHtmlDescription() : SafeHtml { 
    return this.sanitizer.bypassSecurityTrustHtml(this.productDescription);
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
