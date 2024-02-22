import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app-config';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { MessageService, ErrorMessages } from './message.service';
import {BehaviorSubject} from 'rxjs';
import { AuthData } from './auth-data';
import { UserRegistrationVm } from './model/userRegistrationVm';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {  userLoginVm } from './model/userLoginVm';
import { JsonPipe } from '@angular/common';
import { UserTokenVm } from './model/userTokenVm';
import { AuthToken } from './auth-token';

export const ANONYMOUS_USER : AuthData = new AuthData(
  {
    token: undefined,
    refreshToken: undefined,
    expiresAt: undefined
  }
);

@Injectable({providedIn: 'root'})
export class IdentityService {

  private authDataSubject = new BehaviorSubject<AuthData>(ANONYMOUS_USER);
  user$ : Observable<AuthData> = this.authDataSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(authData =>authData.username != undefined));
  isLoggedOut$: Observable<boolean> = this.user$.pipe(map(authData => authData.username == undefined));
  
  
  constructor( @Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient, 
              private messageService: MessageService) {
      console.log('Identity Service is created');
      this.user$.pipe(tap(authData=>{console.log('User initial data in identity Service: ' + JSON.stringify(authData));}));
    
  }
  
  
  
  //#region API to get Tokens
  login(loginData:userLoginVm): Observable<AuthData> {

    //As CORS is not enabled on identity Server this api will respond 400
    // And on API server the Account/Login api returns 500
    var authData = new AuthData({token: undefined,refreshToken: undefined,expiresAt: undefined });
    this.http.post<AuthToken>(this.buildLoginApiUrl() , loginData).pipe(
      tap(token => {
        //this.user$  .subscribe(data => {Userdata.username = loginData.userName;});
        //authData.
        this.authDataSubject.next(new AuthData(token));
        // console.log('Token: ' + token);
        this.user$.pipe(map(data => {data.username = loginData.userName;}));
          
      }));
      return of( authData );

      //map<UserTokenVm>(token => {console.log('Token: ' + JSON.stringify(token)); return new AuthData(token);}),;
  }


// Chat GPT version:

getApplicationToken(succesCallback: { (data: any): void; (arg0: AuthData): void; }, errorCallback: { (error: any): void; (arg0: any): void; }): Observable<any> {
  return this.http.get<any>(this.buildLoginApiUrl()).pipe(
    map(token => {
      let auth = new AuthData(token);
      this.authDataSubject.next(auth);
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

    this.user$.pipe(tap(authData=>{
          console.log('Logging out');
          authData.clearToken();
          authData.username = undefined; 
        }));
    this.authDataSubject.next(ANONYMOUS_USER);
  }
  //#endregion


  //#region Auth data fecthing functions

  getAuthData(): Observable<AuthData> {
    return this.authDataSubject.asObservable();
  }
  
  register(userToRegister: UserRegistrationVm): Observable<boolean> {
    return this.http.post<boolean>(this.buildRegisterApiUrl(), userToRegister)
      .pipe(
        shareReplay(1),
        //tap(responseData => this.authDataSubject.next())
      );
  }

  forgotPassword(email: string): Observable<boolean> {
    
    return this.http.post<boolean>(this.config.identityEndPoint + 'authentication/forgot-password', email).pipe(
      map(response => {
        // Email has been sent
        alert('Email has been sent');
        return response;
      }));
  }

  //#endregion

  private  buildLoginApiUrl() : string{
    return this.config.identityEndPoint + '/authentication/login-user';
  }

  private  buildRegisterApiUrl() : string{
    return this.config.identityEndPoint + '/authentication/register-user';
  }
  
  private  buildRefreshToken() : string{
    return this.config.identityEndPoint + '/authentication/refresh-token';
  }

  private  buildForgotPassword() : string {
    return this.config.identityEndPoint + '/authentication/forgot-password';
  } 
  //#endregion

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


}

