import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AuthService} from "./shared/services/auth.service";
import {RequestService} from "./shared/services/request.service";
import {EntityService} from "./shared/services/entity.service";
import {UserService} from "./shared/services/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MainboardModule} from "./mainboard/mainboard.module";
import {AuthenticationInterceptor} from "./shared/services/authentication.interceptor";
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoginComponent} from "../pages/login/login.component";
import {RegistrationComponent} from "../pages/registration/registration.component";
import {DataProvider} from "./shared/services/data.provider";
import {CommunicationProvider} from "./shared/services/communication ";
import {KeysPipe} from "../pipes/keys/keys";
import {MinuteSecondsPipe} from "../pipes/minute-seconds/minute-seconds";
import {UtilityService} from "./shared/services/utility.service";

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegistrationComponent,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    MainboardModule,
    LoadingBarHttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DataProvider,
    RequestService,
    EntityService,
    UserService,
    CommunicationProvider,
    UtilityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    KeysPipe,

  ]
})
export class AppModule {
}
