import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const Configurations: IAppConfig = {
    //apiEndpointAzure: 'http://nutrientsshoppingapi.azurewebsites.net/api/,
    //identityEndPointAzure : 'http://ec2-18-216-130-34.us-east-2.compute.amazonaws.com:83/api',
    apiEndpoint: 'https://localhost:7150/api',
    //apiEndpoint: 'http://ec2-18-216-130-34.us-east-2.compute.amazonaws.com:83/api/',
    identityEndPoint : 'http://ec2-18-216-130-34.us-east-2.compute.amazonaws.com:82/',
    userClientId : 'roclient',
    defaltHttpOptions : { headers : {'Content-Type' : 'application/json'}},
    applicationClientId : 'nutrientsClient',
    clientSecret : 'mybestkeptnutrientsshoppingsecret',
    brandImageUrl : 'assets/images/brand-logo.png',
    //testApiEndpointAzure : 'http://nutrientsshoppingapi.azurewebsites.net/api/', 
    testApiEndpoint : 'http://ec2-18-216-130-34.us-east-2.compute.amazonaws.com:83/api/'   
  };

  export interface IAppConfig{
    apiEndpoint : string;
    userClientId: string;
    applicationClientId : string;
    defaltHttpOptions : object;
    identityEndPoint : string;
    clientSecret : string;
    brandImageUrl : string;
    testApiEndpoint : string;  
  }

  export enum ENVIRONMENT {
    TEST =0,
    LIVE =1
  }


