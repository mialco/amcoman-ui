import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ProductData } from '../product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../products.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {


  
  constructor (@Inject (ProductsService) private productsService:ProductsService
  , private route: ActivatedRoute
  ,private sanitizer: DomSanitizer
  ){



  }
  productList!: MatTableDataSource<ProductData>;
  displayedColumns: string[] = ['productName', 'description', 'image'];
  totalPages: number = 50;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(){    
    console.log('ProductList component ngOnInit');
    if(this.productsService.pageState.pageActivated === false)
    {
      this.productsService.pageState.pageActivated = true;
      this.productsService.loadStateFromStorage();
    }
    //this.productsService.setPageSize(this.paginator.pageSize);
    this.route.queryParams.subscribe(params => {
      if (params['currentPage'] === undefined)      
        return;
      if (params['pageSize'] === undefined)      
        return;
      if (params['categories'] === undefined || params['categories'] === null || params['categories'] === '')
      {
        //I would like to return an empty list of products
        if (this.productList !== undefined)
          this.productList.data = [];
        //and reset the paginator
        if (this.paginator !== undefined){
          this.paginator.firstPage();
          this.paginator.length = 0;
          this.productsService.setPageSize(this.paginator.pageSize);
        }
        this.productsService.goToFirstPage();
        this.totalPages = 0;
        this.productsService.pageState.currentPage = 1;
        this.productsService.pageState.totalItems = 0;

        return;
      }
      this.totalPages = 50;
      this.productsService.setPageSize(this.totalPages);
      console.log('ProductList component ngOnInit : Here is before calling update product List. Paginator is: ' + this.paginator);
      this.updateProductList(params, this.productsService.getCurrentPage(), this.productsService.getPageSize());    
    });

  
    this.productList = new MatTableDataSource<ProductData>(undefined);
  
  //var products = 

  //this.productsService.getProducts(1,2).subscribe(result=>this.productList.data = result);
  

  //this.productList.paginator = this.paginator;
  this.productList.sort=this.sort;
  

}

ngAfterViewInit(){
  console.log('ProductList component ngAfterViewInit');
  this.productList.sort = this.sort;
  this.paginator.length = this.productsService.pageState.totalItems;
  this.paginator.pageSize = this.productsService.pageState.pageSize;
  this.paginator.pageIndex = this.productsService.pageState.currentPage - 1;
  this.paginator.pageSizeOptions = [3, 10, 25, 100];
  //Here we subscribe to the page event. That is when the user clicks on the paginator 
  // we will get the new  page index and page size and will send it to the server for new data  
  this.paginator.page.subscribe(event => {
    console.log('Reponding Page event: ' + event.pageIndex + ' ' + event.pageSize);
    //this.productsService.setPageSize(event.pageSize);
  });
}

updateProductList(params: Params,  pageCounter:number, pageSize:number){
  
  //console.log('updateProductList' +   JSON.stringify(params));
  console.log('updateProductList method: we want to see if the paginator has an instance  and if we can update the page size =>' + this.paginator); 
  this.productsService.getProducts(this.productsService.getCurrentPage(), this.productsService.getPageSize(), {params}).subscribe(result=>{
      this.productList.data = result.products;
      this.totalPages = 50;
      console.log('we are in the updatePrductList, subscribe metehod and we have the paginator instance =>' + this.paginator + ' will have total items: ' + result.pagination.totalItems );
      // Here we can update the paginator length with the current list total items
      this.paginator.length = result.pagination.totalItems;

    });
  
}

sanitizeDescription(description: string): SafeHtml {
  
  return this.sanitizer.bypassSecurityTrustHtml(description);
}

loadPage(event: PageEvent){
  console.log('loadPage');
  let pageCurrent = event.pageIndex ;
  let pageSize = event.pageSize;
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
  //this.productList.paginator = this.paginator;
  this.productList.sort=this.sort;
  }
}

    //this.initMockData();
/*
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
  */
