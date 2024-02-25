import { Component, OnInit } from '@angular/core';
import { MessageService } from './core/message.service';
import { IdentityService } from './core/identity.service';
import { AuthData } from './core/auth-data';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BasicModule } from './basic/basic.module';
import { CoreModule } from './core/core.module';

import { provideRouter, Router } from '@angular/router';
import { SideMenuState } from './side-menu-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //imports:[CommonModule, RouterOutlet,RouterLink, RouterLinkActive]
})


export class AppComponent {
  user$:Observable<AuthData> | undefined;
  title = 'Nutirents shopping';
  authData: AuthData = new AuthData();
  //isCollapsed: Array<boolean> = [false, false];
  //isMenuExpanded: boolean = this.sideMenuState.isMenuExpanded;

  constructor(private identityService: IdentityService, public sideMenuState: SideMenuState) {
    this.sideMenuState.isCollapsed = [false];
  }

  ngOnInit() {
    console.log('App component is created and using AuthData' );
    this.sideMenuState.isMenuExpanded = true;
    //this.sideMenuState.isCollapsed = this.sideMenuState.isCollapsed;
    this.user$ = this.identityService.user$;
    this.identityService.getAuthData().subscribe(data => {
      this.authData = data;
    });
  }

}
