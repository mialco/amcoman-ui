import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
//import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    //AppRoutingModule
  ],
  declarations: [UserNavigationComponent],
  exports : [UserNavigationComponent]
})
export class UserModule { }
