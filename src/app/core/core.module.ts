import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Route } from '@angular/router'


import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { FormControl, FormsModule } from '@angular/forms';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TruncateComponent } from './truncate/truncate.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule} from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { SideMenuDynamicComponent } from './side-menu-dynamic/side-menu-dynamic.component';
import {  MatListModule } from '@angular/material/list';
import { SideMenuTreeComponent } from './side-menu-tree/side-menu-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryGroupsComponent } from './category-groups/category-groups.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,    
  ],
  declarations: [MessageComponent, LoginComponent, BrandLogoComponent, SideMenuTreeComponent, SideMenuComponent,SideMenuDynamicComponent, TruncateComponent
    ,ProductDetailsComponent,ProductListComponent,     CategoryGroupsComponent ],
  exports: [MessageComponent,BrandLogoComponent,SideMenuComponent,SideMenuTreeComponent,SideMenuDynamicComponent,TruncateComponent, LoginComponent
    ,ProductDetailsComponent, ProductListComponent, CategoryGroupsComponent]
  //entryComponents:[LoginComponent]
})
export class CoreModule { }
