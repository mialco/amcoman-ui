import { Component, OnInit, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from '../../app-config'

@Component({
  selector: 'brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.css']
})
export class BrandLogoComponent implements OnInit {
  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }
  logoUrl : string| undefined ;
  ngOnInit() {
    this.logoUrl = this.config.brandImageUrl;
  }

}
