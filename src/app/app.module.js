var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AuthService } from "./shared/services/auth.service";
import { RequestService } from "./shared/services/request.service";
import { EntityService } from "./shared/services/entity.service";
import { UserService } from "./shared/services/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MainboardModule } from "./mainboard/mainboard.module";
import { AuthenticationInterceptor } from "./shared/services/authentication.interceptor";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoginComponent } from "../pages/login/login.component";
import { RegistrationComponent } from "../pages/registration/registration.component";
import { DataProvider } from "./shared/services/data.provider";
import { CommunicationProvider } from "./shared/services/communication ";
import { KeysPipe } from "../pipes/keys/keys";
import { UtilityService } from "./shared/services/utility.service";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                { provide: ErrorHandler, useClass: IonicErrorHandler },
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map