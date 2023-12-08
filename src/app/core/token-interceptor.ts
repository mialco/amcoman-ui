import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
//import 'rxjs/add/operator/do';
//import 'rxjs'

import { Observable } from 'rxjs';
import { IdentityService } from './identity.service';
import { Injector } from '@angular/core';
import { AuthData } from './auth-data';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector : Injector) { }
    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let identityService  = this.injector.get(IdentityService);
        let token = 'Bearer '+AuthData.getToken();
        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(request);
    }
}