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
import { HttpHeaders } from '@angular/common/http';

export const ANONYMOUS_USER : AuthData = new AuthData();


@Injectable({providedIn: 'root'})
export class IdentityService {

  private authData = new AuthData();
  private authDataSubject = new BehaviorSubject<AuthData>(this.authData);
  user$ : Observable<AuthData> = this.authDataSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(authData => authData.username !== ''));
  isLoggedOut$: Observable<boolean> = this.user$.pipe(map(authData => authData.username === '' ));
  
  
  constructor( @Inject(APP_CONFIG) private config: IAppConfig, public http: HttpClient, 
              private messageService: MessageService) {
      console.log('Identity Service is created');
      this.loginFromStorage();
      this.user$.pipe(tap(authData=>{console.log('User initial data in identity Service: ' + JSON.stringify(authData));}));
    
  }

  
  //when we load the service we check if the user is already logged in
  loginFromStorage() {
    var jwtToken = localStorage.getItem('jwttoken');
    if (jwtToken) {
      this.authData.username = localStorage.getItem('user')!;
      this.authData.roles = JSON.parse(localStorage.getItem('roles')!);
      this.authData.email = localStorage.getItem('email')!;
      this.authData.refreshToken = localStorage.getItem('refreshToken')!;
      this.authData.expiresAt = JSON.parse(localStorage.getItem('expiresAt')!);
      this.isLoggedIn$ = of(true);
      this.isLoggedOut$ = of(false);
      
    }
    else {
      this.isLoggedIn$ = of(false);
      this.isLoggedOut$ = of(true);
    }
  }  
  
  async login(loginData:userLoginVm): Promise<string>  {     //: Observable<AuthData| undefined> {
    var authData! : AuthData 
    var url = this.buildLoginApiUrl()
    console.log('Login data sent to api: ' + url  +  ' ' +   JSON.stringify(loginData));

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    await of (this.http.post<AuthToken>(url,loginData).
        subscribe(token => {
            console.log('Data received from loginapi: ' + JSON.stringify(token));
            //We extract the user name from the token and set it in the authData
            this.authData.token = token;
            this.authData.username='';
            this.authData.saveToken(token);
            console.log('User name after saving token: ' + this.authData.username);
            localStorage.setItem('user',this.authData.username);
            localStorage.setItem('roles',JSON.stringify( this.authData.roles));
            localStorage.setItem('email',this.authData.email);
            if (token.token) {
              localStorage.setItem('jwttoken', token.token);
              AuthData.jwtToken = token.token;
            }
            if (token.refreshToken) {
              localStorage.setItem('refreshToken', token.refreshToken);
              this.authData.refreshToken = token.refreshToken; 
            }
            if (token.expiresAt) {
              localStorage.setItem('expiresAt', JSON.stringify(token.expiresAt));
              this.authData.expiresAt = token.expiresAt;
            } 
            this.isLoggedOut$ = of(false);
            this.isLoggedIn$ = of(true);
            //this.authDataSubject.next(authData);
            console.log('AuthData after login: ' + JSON.stringify(this.authData.username));
            return '';  
        }
      // ,error => {
      //   let errorMessage = '';        
      //   console.log('Error in login after subscribe: ' + JSON.stringify(error));
      //   if(error.headers){
      //     error.headers.forEach((item: string) => {
      //       console.log(item + ' : ' + item + ' : ' );
      //     });
      //     if(error.headers.status){
      //       errorMessage = error.headers.status! + ' - ';
      //     }
      //     if (error.headers.title){
      //       errorMessage += error.headers.title!;
      //     }
      //   }
      //   if (errorMessage === '') {
      //     errorMessage = 'Unauthorized';
      //   }
      //   return of(errorMessage); 
      // }          
      )
      ,
      catchError (error => {
        console.log('Error in login: ' + JSON.stringify(error));
        this.messageService.parseErrorAndPush(error, new ErrorMessages("error: " + JSON.stringify(error)));        
        return 'Unauthorized'; 
      })) ;
      return '';
  }

getUserName(): string {
  return this.authData.username;
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
    console.log('Log out is called');
    this.clearToken();
    this.authData.clear();
    this.isLoggedIn$ = of(false);
    this.isLoggedOut$ = of(true);
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

  private clearToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
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


}

