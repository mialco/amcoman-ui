import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CoreModule } from '../core/core.module';
import { AffiliateDisclosureComponent } from './affiliate-disclosure/affiliate-disclosure.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CoreModule
  ],
  declarations: [HomeComponent, ContactusComponent,NavigationComponent, AffiliateDisclosureComponent, FooterComponent],
  exports: [NavigationComponent,AffiliateDisclosureComponent,FooterComponent]
})
export class BasicModule { }
