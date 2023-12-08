import { Component, OnInit,Input } from '@angular/core';
import { NgbModal } from  '@ng-bootstrap/ng-bootstrap' ; //'@ng-bootstrap/ng-bootstrap/modal/modal';
import { LoginComponent } from '../../core/login/login.component';
import { IdentityService } from '../../core/identity.service';
import { AuthData } from '../../core/auth-data';
import {BrandLogoComponent} from '../../core/brand-logo/brand-logo.component'

// src/app/navigation/navigation.component.ts

// @Component({
//   selector: 'app-navigation',
//   templateUrl: './navigation.component.html',
//   styleUrls: ['./navigation.component.css']
// })
// export class NavigationComponent {
//   // You can add navigation-related logic here
// }


@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Input()
  authData!: AuthData;
  collapsed : boolean = true;
  
  constructor(private modelService : NgbModal, public identityService : IdentityService) { 
    
  }

  //login
  open(){
    const modalRef = this.modelService.open(LoginComponent,{windowClass : 'login-modal'});
  }

  logout(){
    this.identityService.logOut();
  }
}
