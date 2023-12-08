import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { MessageService, ErrorMessages } from './message.service';
import {BehaviorSubject} from 'rxjs';
import { AuthData } from './auth-data';


@Injectable({providedIn: 'root'})
export class IdentityService {

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient, private messageService: MessageService) {
    
  }
  private authData = new BehaviorSubject<AuthData>(new AuthData());

  //#region API to get Tokens
  login(userName: string, password: string): Observable<AuthData> {

    //As CORS is not enabled on identity Server this api will respond 400
    // And on API server the Account/Login api returns 500
    return this.http.post<any>(this.config.identityEndPoint + 'connect/token', 'client_id=roclient&client_secret=mybestkeptnutrientsshoppingsecret&grant_type=password&username=mikeo1&password=mikeo1',
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

  /*/
  getApplicationToken(succesCallback: { (data: any): void; (arg0: AuthData): void; }, errorCallback: { (error: any): void; (arg0: any): void; }): any {

    //Temporary till CORS enabled on identity Server
    return this.http.get<any>(this.config.apiEndpoint + 'identity/token/nutrientsClient').subscribe(
      token => {
        let auth = new AuthData(token);
        this.authData.next(auth);
        succesCallback(auth);

      },
      error => {
        this.messageService.parseErrorAndPush(error, new ErrorMessages("error: "+JSON.stringify(error)))
        errorCallback(error);
      }
    );

    //Should be the code once Identity in place
    // return this.http.post<any>(this.config.identityEndPoint + 'connect/token', {
    //   client_id: this.config.applicationClientId,
    //   client_secret: this.config.clientSecret,
    //   grant_type: 'client_credentials'
    // },
    // { headers : {'Content-Type' : 'application/x-www-form-urlencoded'}});
  }
*/

// Chat GPT version:

getApplicationToken(succesCallback: { (data: any): void; (arg0: AuthData): void; }, errorCallback: { (error: any): void; (arg0: any): void; }): Observable<any> {
  return this.http.get<any>(this.config.apiEndpoint + 'identity/token/nutrientsClient').pipe(
    map(token => {
      let auth = new AuthData(token);
      this.authData.next(auth);
      succesCallback(auth);
      return token;
    }),
    catchError(error => {
      this.messageService.parseErrorAndPush(error, new ErrorMessages("error: " + JSON.stringify(error)));
      errorCallback(error);
      throw error; // Rethrow the error to propagate it downstream
    })
  );
}


  logOut(): void {

    AuthData.clearToken();
    this.authData.next(new AuthData());

  }
  //#endregion


  //#region Auth data fecthing functions

  getAuthData(): Observable<AuthData> {
    return this.authData.asObservable();
  }
  
 
  //#endregion

  
}
