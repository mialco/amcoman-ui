import { Component, OnInit } from '@angular/core';
import { MessageService } from './core/message.service';
import { IdentityService } from './core/identity.service';
import { AuthData } from './core/auth-data';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BasicModule } from './basic/basic.module';
import { CoreModule } from './core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Amcoman';
  authData: AuthData= new AuthData();
  constructor(private identityService: IdentityService){
    
  }
  ngOnInit() {
    this.identityService.getAuthData().subscribe(data => {
      this.authData = data;
    });
  }

}
