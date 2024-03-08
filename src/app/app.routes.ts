 import { Routes } from '@angular/router';
 import { ContactusComponent } from './basic/contactus/contactus.component';
 import { HomeComponent } from './basic/home/home.component';
import { ProductListComponent } from './core/product-list/product-list.component';
import { ProductDetailsComponent } from './core/product-details/product-details.component';
 
 export const routes: Routes = [
   { path: 'contact-us', component: ContactusComponent },
   { path: 'about-us', component: ContactusComponent },
   //{ path:'products/list',component: ProductListComponent},
   { path:'products/list/search',component: ProductListComponent},
   { path:'products/list/category/:id',component: ProductListComponent},
   { path:'products/list',component: ProductListComponent},
   { path:'product/:id',component: ProductDetailsComponent},

   { path: '**', component: HomeComponent },

 ];
