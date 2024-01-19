import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ProductData } from '../product.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {


  productList!: MatTableDataSource<ProductData>;
  displayedColumns: string[] = ['productName', 'description', 'image'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(){
    //this.initMockData();
    const products: ProductData[] = [
      {id:1,productName:"product1",   description : 'My first product - mialco website',
      price:1,
      navigateUrl: 'https://mialco.com/e-commerce-installation-on-aws-basic-installation',
      imgUrl: 'http://mialco.com/images/thumbs/0000091_e-commerce-installation-on-aws-basic-installation_415.jpeg',
      additionalInfoTitle:'string',
      additionalInfoUrl: 'string',
      advertiser:'string',
      advertizerLinkID:'string', 
      endDate:new Date(),
      imgAlt :'string',
      imgDescription:'string',
      isActive :true,
      linkCode:'string',
      startDate:new Date()
   },
   {id:2,productName:"product2",   description : 'My second product - Mialco.net',
      price:2,
      navigateUrl: 'https://demostore.mialco.net',
      imgUrl: 'http://mialco.com/images/thumbs/0000090_complete-e-commerce-online-store-with-basic-hosting_415.jpeg',
      additionalInfoTitle:'string',
      additionalInfoUrl: 'string',
      advertiser:'string',
      advertizerLinkID:'string', 
      endDate:new Date(),
      imgAlt :'string',
      imgDescription:'string',
      isActive :true,
      linkCode:'string',
      startDate:new Date()
   },   
  ];
  this.productList= new MatTableDataSource<ProductData>(products);
  this.productList.paginator = this.paginator;
  this.productList.sort=this.sort;


}

  private initMockData(){

    const products: ProductData[] = [
      {id:1,productName:"product1",   description : 'string',
      price:1,
      navigateUrl: 'string',
      imgUrl: 'string',
      additionalInfoTitle:'string',
      additionalInfoUrl: 'string',
      advertiser:'string',
      advertizerLinkID:'string', 
      endDate:new Date(),
      imgAlt :'string',
      imgDescription:'string',
      isActive :true,
      linkCode:'string',
      startDate:new Date()
   },
   {id:2,productName:"product2",   description : 'string',
      price:2,
      navigateUrl: 'string',
      imgUrl: 'string',
      additionalInfoTitle:'string',
      additionalInfoUrl: 'string',
      advertiser:'string',
      advertizerLinkID:'string', 
      endDate:new Date(),
      imgAlt :'string',
      imgDescription:'string',
      isActive :true,
      linkCode:'string',
      startDate:new Date()
   }   
  ];
  this.productList= new MatTableDataSource<ProductData>(products);
  this.productList.paginator = this.paginator;
  this.productList.sort=this.sort;
  }
}
