import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter,RouterModule, Routes, withDebugTracing } from '@angular/router';

import { HomeComponent } from '../basic/home/home.component';
import { ContactusComponent } from '../basic/contactus/contactus.component';
import { BulkUpdateComponent } from '../admin-operations/bulk-update/bulk-update.component';
import { BasicModule } from '../basic/basic.module';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'about-us', component: ContactusComponent},
  { path: 'bulk-update', component: BulkUpdateComponent },
  { path: '**', component: ContactusComponent }
];

@NgModule({
  imports: [
    /*
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
      
      ),
    */
    CommonModule,
    BasicModule,
    
  ],
  providers:[provideRouter(appRoutes, withDebugTracing())],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule {appRoutes = appRoutes }
