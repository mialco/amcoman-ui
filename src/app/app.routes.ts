 import { Routes } from '@angular/router';
 import { ContactusComponent } from './basic/contactus/contactus.component';
 import { HomeComponent } from './basic/home/home.component';
 
 export const routes: Routes = [
    { path: 'contact-us', component: ContactusComponent },
    { path: 'about-us', component: ContactusComponent },


    { path: '**', component: HomeComponent },

 ];
