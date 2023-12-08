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



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [MessageComponent, LoginComponent, BrandLogoComponent, SideMenuComponent, TruncateComponent],
  exports: [MessageComponent,BrandLogoComponent,SideMenuComponent,TruncateComponent, LoginComponent]
  //entryComponents:[LoginComponent]
})
export class CoreModule { }
