import { Component, OnInit, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app-config';

import { IdentityService } from '../identity.service';
import { MessageService, MessageType } from '../message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, tap } from 'rxjs/operators';
import { userLoginVm } from '../model/userLoginVm';
import { EMPTY } from 'rxjs';

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
  registrationSuccessMessage: string="";
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


  constructor( @Inject(APP_CONFIG) private config: IAppConfig, 
        public identityService: IdentityService, 
        private messageService: MessageService, 
        private activeModal : NgbActiveModal) { }

  configString: string | undefined;

  ngOnInit() {
    this.configString = JSON.stringify(this.config);
  }

  submitForm(userName: string, password: string) {

    console.log("isLogin: " + this.isLogin);
    console.log("isNewRegistration: " + this.isNewRegistration);
    console.log("isForgotPassword: " + this.isForgotPassword);


    if (this.isNewRegistration) {

      this.registerUser();
    }
 
    if (this.isLogin) {
      this.loginUser(); 
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
        
        //I want to message the user that the registration was successful or not  
        
        //this.activeModal.close();
      })
    ).subscribe({
      next: () => {        
        console.log("register user success");
        this.registrationSuccessMessage="Registration successful. Please login.";
      },
      error: (response) => {
        console.log("register user failed")
        console.log(response.status);
        console.log(response.error);
        console.log(response.message);
        this.errors=response.error.Username;
        
      }
    });
  }

  loginUser() {
    var loginData  = new userLoginVm() ;
    loginData.userName=this.username;
    loginData.password=this.password;
    console.log("is login called");
    console.log(loginData);

    this.identityService.login(loginData)
    // .  .(
    //   tap(data => {
    //     this.activeModal.close();
    //   }),
    //   catchError(error => {
    //     this.messageService.push(MessageType.DANGER, "error in promise");
    //     return EMPTY;
    //   })
    // );
    // this.identityService.login((loginData)=>{
    //   this.activeModal.close();
    // },(error)=>{
    //   this.messageService.push(MessageType.DANGER,"error in promise");
    // })
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
