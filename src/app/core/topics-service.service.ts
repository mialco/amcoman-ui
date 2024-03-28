import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, SecurityContext } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app-config';
import { Observable } from 'rxjs';
import { Topic } from './topic.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(@Inject(APP_CONFIG) private config:IAppConfig,   private http:HttpClient, 
  private sanitizer: DomSanitizer) {

   }
   private baseUrl = `${this.config.apiEndpoint}/topics`;

   public readonly topicNames = {
      Home: 'Home',
    }
    private homeText ?: string = undefined;
    public setHomeText(text:string){
      this.homeText = this.sanitizer.sanitize(SecurityContext.HTML ,text) ?? '';
    }
    public getHomeText():string{
      return this.homeText === undefined ? '' : this.homeText;
    } 

    getTopicByName(topicName:string) :Observable<Topic> { 
      let url = `${this.baseUrl}/topic/name/${topicName}`;
      return this.http.get(url)as Observable<Topic>;
    }



}
