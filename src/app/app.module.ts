import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BasicModule } from './basic/basic.module';
//import { AppRoutingModule } from './app-routing/app-routing.module';
import { MessageService } from './core/message.service';
import { IdentityService } from './core/identity.service';
import { APP_CONFIG, Configurations } from './app-config';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/token-interceptor';
//import { UserModule } from './user/user.module';
//import { AdminOperationsModule } from './admin-operations/admin-operations.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent
  ],
  //imports: [CommonModule, RouterOutlet,BasicModule,CoreModule],
  imports: [
    BrowserModule, 
    HttpClientModule,  
    CoreModule,
    BasicModule,
    //AppRoutingModule,
    //UserModule,
    //AdminOperationsModule,
    FormsModule,
    NgbModule,  //.forRoot(),
  ],
  providers: [MessageService,{provide : HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},IdentityService,{ provide: APP_CONFIG, useValue: Configurations }],
  bootstrap: [AppComponent]
})
export class AppModule { }
