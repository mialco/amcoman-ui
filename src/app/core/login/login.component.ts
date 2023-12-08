import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app-config';

import { IdentityService } from '../identity.service';
import { MessageService, MessageType } from '../message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string="";
  password: string="";
  constructor( @Inject(APP_CONFIG) private config: IAppConfig, public identityService: IdentityService, private messageService: MessageService, private activeModal : NgbActiveModal) { }

  configString: string | undefined;

  ngOnInit() {
    this.configString = JSON.stringify(this.config);
  }

  login(userName: string, password: string) {

    this.identityService.getApplicationToken((data)=>{
      this.activeModal.close();
    },(error)=>{
      this.messageService.push(MessageType.DANGER,"error in promise");
    })
  }
}
