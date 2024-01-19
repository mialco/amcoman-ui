import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing/app-routing.module';
//import { Routes } from './app.routes';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BasicModule } from './basic/basic.module';
import { MessageService } from './core/message.service';
import { IdentityService } from './core/identity.service';
import { ProductsService } from './core/products.service';
import { APP_CONFIG, Configurations } from './app-config';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/token-interceptor';
import { UserModule } from './user/user.module';
import { AdminOperationsModule } from './admin-operations/admin-operations.module';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './basic/home/home.component';
import { ContactusComponent } from './basic/contactus/contactus.component';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule} from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'

// const appRoutes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'contact-us', component: ContactusComponent },
//   { path: 'about-us', component: ContactusComponent},
//   //{ path: 'bulk-update', component: BulkUpdateComponent },
//   { path: '**', component: HomeComponent }
// ];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserModule, 
    HttpClientModule,  
    CoreModule, 
    BasicModule,
    UserModule,
    AdminOperationsModule,
    FormsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NgbModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,  //.forRoot(),  
  ],
  exports:[RouterModule],
  providers: [provideRouter(routes)
    ,MessageService,{provide : HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
    ,IdentityService,{ provide: APP_CONFIG, useValue: Configurations }
  ,ProductsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
