

export class AuthData {
    
    username: string | undefined = "";
    isAdminLoggedIn: boolean = false;
  
    constructor(token? : any) {
  
      if(token){
        this.saveToken(token);
      }
      this.username = this.getUserName();
      this.isAdminLoggedIn = this.getIsAdminLoggedIn();
     
    }
  
    //#region  Token Utilities
    saveToken(token: { access_token: any; }) {
      if(token && token.access_token){
        localStorage.setItem("token", JSON.stringify(token));
      }
      
    }
    
    public static getToken():  string | undefined  {
  
      let accessToken: string;
      if (localStorage.getItem("token")) {
        var result = localStorage.getItem("token") ?? undefined 
        if (result !== undefined)
        {
          return JSON.parse(result).access_token;
        }else{ 
          return undefined;
        }
        
      } else {
        return undefined;
      }
  
    }
  
    decodeToken(token:any): object | undefined {
      if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      } else {
        return undefined;
      }
    }
  
    static clearToken(){
      localStorage.removeItem("token");
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
  
    getIsAdminLoggedIn(): boolean {
      let decodedToken: any = this.decodeToken(AuthData.getToken());
      if (decodedToken) {
        return decodedToken.client_isAdmin !== 'yes';
      } else {
        return false;
      }
    }
  
  }