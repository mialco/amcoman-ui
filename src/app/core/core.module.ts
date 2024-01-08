import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Route } from '@angular/router'


import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TruncateComponent } from './truncate/truncate.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [MessageComponent, LoginComponent, BrandLogoComponent, SideMenuComponent, TruncateComponent
    ,ProductDetailsComponent,ProductListComponent],
  exports: [MessageComponent,BrandLogoComponent,SideMenuComponent,TruncateComponent, LoginComponent
    ,ProductDetailsComponent, ProductListComponent]
  //entryComponents:[LoginComponent]
})
export class CoreModule { }
