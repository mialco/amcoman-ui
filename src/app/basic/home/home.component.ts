import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/message.service';
import { TopicsService } from '../../core/topics-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private topicsService:TopicsService,  public messageService : MessageService) { }

  ngOnInit(){
    
    this.topicsService.getTopicByName(this.topicsService.topicNames.Home).subscribe(
      topic => {
        this.topicsService.setHomeText(topic.body);
        console.log(JSON.stringify(topic.body));
      }
    )

  }  
 
  gethomeText():string{
    return this.topicsService.getHomeText();
  }


}
