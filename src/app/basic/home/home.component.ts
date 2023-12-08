import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public messageService : MessageService) { }

  ngOnInit() {
  }

}
