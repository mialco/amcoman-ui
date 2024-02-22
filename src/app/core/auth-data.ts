import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken } from './auth-token';

export class AuthData {
    
    private readonly roleClaimName:string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    username: string | undefined = "";
    email: string | undefined = "";
    isAdminLoggedIn: boolean = false;
    isLoggedIn: boolean = false;
    roles: string[] = [];

    constructor(token? : AuthToken) {
  
       if (token === undefined || token.token === undefined ) {
        console.log('Empty Token is loaded in the constructor of authData: Will try to get it from storage' + JSON.stringify(token));
        var localTokenString=localStorage.getItem("token");
        var localToken !: AuthToken ;
        if (localTokenString) {
          localToken = JSON.parse(localTokenString);
        }
        if ( localToken === undefined || localToken.token === undefined || localToken.token === null){
          console.log('Token is not in the storage: ');
          this.isLoggedIn=false;
          this.username = undefined;
          this.roles = [];
          this.email = undefined;
          this.isAdminLoggedIn=false;
          return;
        }
        else
        {
        this.isLoggedIn=true;
        this.username = localStorage.getItem("username") ?? "";
        this.roles = JSON.parse(localStorage.getItem("roles") ?? "[]");
       }
      }
      else{
        console.log('Non undefide Token is loaded in the constructor of authData: ' + JSON.stringify(token));
        if(token === undefined || token.token === null || token === undefined || token === null){
          //Attempt to get it from local storage
          console.log('Token is undefined in the constructor we will try to get it from local storage');
          localTokenString=localStorage.getItem("token");
          if (localTokenString) {
            localToken = JSON.parse(localTokenString);
          }
          if (localToken) {
            console.log('Token is loaded from local storage but I believe is empty: ' + localToken);
            token.token = localToken.token;
            this.username = localStorage.getItem("username") ?? "";
            this.roles = JSON.parse(localStorage.getItem("roles") ?? "[]");            
          }
          else{
            console.log('Token is loaded from local storage is emty so we are looging out');
            this.isLoggedIn=false;
            this.username = undefined;
            this.roles = [];
            this.email = undefined;
            this.isAdminLoggedIn=false;
            return;
          }
          // Do something if the token is an instance of AuthData and has an access_token property
        }
        else{ //Token is not undefined so it was passed in
          this.saveToken(token);
        } 
      }
     
    }
  
    //#region  Token Utilities
    // saveToken(token: { access_token: any; }) {
    //   console.log('Storing Token: ' + JSON.stringify(token));
    //   console.log('Storing Token Acceess_tOKEN: ' + JSON.stringify(token));
    //   if(token && token.access_token){
    //     console.log('Storing Token in local storage: ' + JSON.stringify(token));

    //     localStorage.setItem("token", JSON.stringify(token));

    //   }
      
    // }

    saveToken(token:  any ) {
      if (!token) {
        return;
      }
      console.log('Storing Token: ' + JSON.stringify(token));
      console.log('Storing Token Acceess_tOKEN: ' + JSON.stringify(token));
      if (token) {
      var userClaims : any= this.decodeToken(token.token);
      console.log('Storing TokenVm in local storage: ' + JSON.stringify(userClaims));
      if (userClaims)
      { 
        this.username = userClaims.sub;
        this.email = userClaims.email;
        this.isAdminLoggedIn= userClaims.role === 'Admin';
        console.log('user in local storage: ' + userClaims.sub);
        console.log('email in local storage: ' + userClaims.email);
        console.log('role in local storage: ' + userClaims.role);
      }

    }
      // if(token && token.access_token){
      //   console.log('Storing Token in local storage: ' + JSON.stringify(token));

       localStorage.setItem("token", JSON.stringify(token));
       localStorage.setItem("roles", JSON.stringify(this.roles));
       localStorage.setItem("username", this.username ?? "");

      // }
      
    }


    public static getToken():  string | undefined  {
  
      let accessToken: string;
      if (localStorage.getItem("token")) {
        var result = localStorage.getItem("token") ?? undefined 
        if (result !== undefined)
        {
          //return JSON.parse(result).access_token;
          return JSON.parse(result).token;
        }else{ 
          return undefined;
        }
        
      } else {
        return undefined;
      }
  
    }
  
    /**
     * 
     * @param token @deprecated use decodeToken instead
     * @returns 
     */
    decodeToken_old(token:any): object | undefined {
      if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      } else {
        return undefined;
      }
    }

    decodeToken(token:any): object | undefined {
      if (token) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        console.log('decoded token: ' + JSON.stringify(decodedToken));
        //How do I insure that the roles are always an array?

        var roles = decodedToken[this.roleClaimName]  ; 
        if (roles && !Array.isArray(roles)) {
            roles = new Array(roles);
        }
        if (roles) {
          this.roles = [...roles];
        }
        console.log('decoded token roles: ' + this.roles);
        return decodedToken;
      }
      else {
        return undefined;
      }
    }
  
    clearToken(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      localStorage.removeItem("email");
      this.username = "";
      this.email = "";
      this.roles = [];

    }
    //#endregion
  
  
    getUserName(): string | undefined {
      let decodedToken: any = this.decodeToken(AuthData.getToken());
  
      if (decodedToken) {
        return decodedToken.client_id;
      } else {
        return undefined;
      }
    }
  
    getIsLoggedIn(): boolean {
      let token  = localStorage.getItem("token");
      if (token) {
        return true;
      } else {
        return false;
      }
    }
    getIsAdminLoggedIn(): boolean {
      let decodedToken: any = this.decodeToken(AuthData.getToken());
      if (decodedToken) {
        return decodedToken.client_isAdmin !== 'yes';
      } else {
        return false;
      }
    }
  
  }