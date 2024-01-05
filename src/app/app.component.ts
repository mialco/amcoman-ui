import { Component, OnInit } from '@angular/core';
import { MessageService } from './core/message.service';
import { IdentityService } from './core/identity.service';
import { AuthData } from './core/auth-data';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BasicModule } from './basic/basic.module';
import { CoreModule } from './core/core.module';

import { provideRouter, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //imports:[CommonModule, RouterOutlet,RouterLink, RouterLinkActive]
})


export class AppComponent {
  title = 'Nutirents shopping';
  authData: AuthData= new AuthData();
  constructor(private identityService: IdentityService){
    
  }
  ngOnInit() {
    this.identityService.getAuthData().subscribe(data => {
      this.authData = data;
    });
  }

}
