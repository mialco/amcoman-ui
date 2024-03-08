import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app-config';

import { IdentityService } from '../identity.service';
import { MessageService, MessageType } from '../message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, tap } from 'rxjs/operators';
import { userLoginVm } from '../model/userLoginVm';
import { EMPTY, Observable, of } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly ModeNameLogin: string="login";
  private readonly ModeNameRegister: string="register";
  private readonly FormTitleLogin: string="Welcome back! Please login.";
  private readonly FormTitleRegister: string="Create an account.";
  private readonly FormTitleForgotPassword: string="Forgot your password? Want to reset it?";
  private readonly FormDescriptionLogin: string="Enter your username/email  and password to login.";
  private readonly FormDescriptionRegister: string="Enter your details to create an account.";
  private readonly FormDescriptionForgotPassword: string="Enter your email to reset your password.";
  
  errors: string[] = [];
  authSuccessMessage: string="";
  errorMsg$: Observable<string>;
  authSuccessMessage$: Observable<string>;
  username: string="";
  password: string="";
  confirmPassword: string="";
  email: string="";
  firstName: string="";
  lastName: string="";
  mode: string=this.ModeNameLogin;
  isNewRegistration: boolean=false;
  isForgotPassword: boolean=false;
  isLogin: boolean=true;
  showRegisterCmd: boolean=true;
  showForgotPasswordCmd: boolean=true;
  showLoginCmd: boolean=false;
  showEmaiGroup: boolean=false;
  formTitle : string=this.FormTitleLogin;
  formDescription : string=this.FormDescriptionLogin;
  // Buttons properties
  showCloseButton: boolean = false;
  showSubmitButton: boolean = true;
  submitButtonText: string = "Submit";
  waitForLogin$: Observable<string> = EMPTY;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig, 
        public identityService: IdentityService, 
        private messageService: MessageService, 
        private activeModal : NgbActiveModal) { 
        this.waitForLogin$ = new Observable<string>(observer=>{observer.next('');});
        this.errorMsg$ = new Observable<string>();
        this.authSuccessMessage$ = new Observable<string>();
        }

  configString: string | undefined;

  ngOnInit() {
    this.configString = JSON.stringify(this.config);
    this.waitForLogin$.subscribe();
    this.errorMsg$.subscribe(data=>{this.errors.push(data);});
    this.identityService.loginProcessStatus.subscribe(data=>{
    if(data=='Success'){
      this.errors=[];
      this.authSuccessMessage= 'Successfully logged in';
      this.showCloseButton=true;
      this.showSubmitButton=false;
    }
    else if(data=='Unauthorized'){
      this.errors.push('Invalid username or password');
    }
    });
  }

  submitForm(userName: string, password: string) {

    console.log("isLogin: " + this.isLogin);
    console.log("isNewRegistration: " + this.isNewRegistration);
    console.log("isForgotPassword: " + this.isForgotPassword);


    if (this.isNewRegistration) {

      this.registerUser();
    }
 
    if (this.isLogin) {
      this.loginUser$(); 
  }

    if (this.isForgotPassword) {
      this.identityService.forgotPassword(this.email).subscribe(
        data => {
          this.activeModal.close();
        },
        error => {
          this.messageService.push(MessageType.DANGER, "error in promise");
        });
    }
  }

  registerUser() {
    console.log("is new registration called" );    
    var  userRegistrationVm = {
      userName: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    //validate password
    if (this.password != this.confirmPassword) {
      console.log("passwords do not match");
      this.messageService.push(MessageType.DANGER, "Passwords do not match");
      this.errors.push
      return;
    }

    this.identityService.register(userRegistrationVm).pipe(
      tap(data => {
        
      })
    ).subscribe({
      next: () => {        
        console.log("register user success");
        this.authSuccessMessage="Registration successful. Please login.";
      },
      error: (response)=> {
        console.log("register user failed");
        console.log(response.status);
        console.log(response.error);
        console.log(response.message);
        this.errors=response.error.Username;
        
      }
    });
  }

  loginUser$()  {
    var loginData  = new userLoginVm() ;
    loginData.userName=this.username;
      loginData.password=this.password;
    console.log("is login called");
    console.log(loginData);
    // const response$ = new Observable((observer) =>{
    //   let stringResponse: string;
    //   this.identityService.login(loginData)(
    //     (stringResponse1: string) => observer.next(stringResponse),
    //     (error: any) => observer.error(error),
    //     () => observer.complete()
      

        
    //   );
    // }
    // );
    try {
 
      this.identityService.login(loginData)
      .subscribe({
        next: (data) => {
          console.log("login response: " + data);
          if (data === 'Success') {
            console.log("login success");
            this.authSuccessMessage = "Successfully logged in."; // Assign the string value directly
            this.showCloseButton = true;
            this.showSubmitButton = false;
          } else if (data === '') {
            // Do nothing
          } else {
            this.errors.push("Invalid username or password");
          }
        },
        error: (response)=> {
          console.log("login user failed");
          console.log(response.status);
          console.log(response.error);
          console.log(response.message);
          this.errors.push(response.error);
          
        },complete: () => {
          console.log("login Completed");
        }
      }).unsubscribe();
      
      // .pipe(
        //   tap(data => {
        //     console.log("login response: " + data);
        //     if (data === 'Success') {
        //       console.log("login success");
        //       this.authSuccessMessage = "Successfully logged in."; // Assign the string value directly
        //       this.showCloseButton = true;
        //       this.showSubmitButton = false;
        //     } else if (data === '') {
        //       // Do nothing
        //     } else {
        //       this.errors.push("Invalid username or password");
        //     }
        //     })
        // ).subscribe(() => {
          
        //   console.log("login success");
        // });
          // this.authSuccessMessage = "Successfully logged in.";
          // this.showCloseButton = true;
          // this.showSubmitButton = false;
      this.identityService.isLoggedIn$.subscribe(
        data=>{console.log(' Login  component Is logged in: ' + data);
        //this.closeModal();
      
        }
        );  
      this.identityService.isLoggedOut$.subscribe(
        data=>{console.log(' Login  component Is logged out: ' + data);}
        
        );  
            
        
    } catch (error) {
      console.log("login error: " + error);
      this.errors.push("Invalid username or password");
    }
    //return response$;
  }


  showRegister_Clicked() {
    this.errors=[];
    this.isNewRegistration=true;
    this.isForgotPassword=false;
    this.showEmaiGroup=true;
    this.isLogin=false;
    this.showRegisterCmd=false;
    this.showForgotPasswordCmd=false;
    this.showLoginCmd=true;
    this.formTitle=this.FormTitleRegister;
    this.formDescription=this.FormDescriptionRegister;
    this.submitButtonText="Register";
    this.showCloseButton=false;
    this.showSubmitButton=true;
  }

  showForgotPassword_Clicked() {
    this.errors=[];
    this.isNewRegistration=false;
    this.isForgotPassword=true;
    this.showEmaiGroup=true;
    this.isLogin=false;
    this.showRegisterCmd=true;
    this.showForgotPasswordCmd=false;
    this.showLoginCmd=true;
    this.formTitle=this.FormTitleForgotPassword;
    this.formDescription=this.FormDescriptionForgotPassword;
    this.submitButtonText="Submit";
    this.showCloseButton=false;
    this.showSubmitButton=true;
  }

  showLogin_Clicked() {
    this.errors=[];
    this.isNewRegistration=false;
    this.isForgotPassword=false;
    this.showEmaiGroup=false;
    this.isLogin=true;
    this.showRegisterCmd=true;
    this.showForgotPasswordCmd=true;
    this.showLoginCmd=false;
    this.formTitle=this.FormTitleLogin;
    this.formDescription=this.FormDescriptionLogin;
    this.submitButtonText="Login";
    this.showSubmitButton=true;
    this.showCloseButton=false;
  }

  showPassword() : boolean {
    return this.isNewRegistration || this.isLogin;
  }
  showUsername() : boolean {
    return this.isNewRegistration || this.isLogin;
  }
  closeModal() {
    this.activeModal.close();
  }
}
