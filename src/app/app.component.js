var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainboardComponent } from "./mainboard/mainboard.component";
import { LoginComponent } from "../pages/login/login.component";
import { MenuController } from 'ionic-angular';
import { CommunicationProvider } from "./shared/services/communication ";
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, comm) {
        this.menuCtrl = menuCtrl;
        this.comm = comm;
        this.enabled = true;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        // this.pages = [
        //   { title: 'List', component: ListPage }
        // ];
    }
    MyApp.prototype.logout = function () {
        console.log('123');
        this.nav.setRoot(LoginComponent);
        this.enabled = false;
        localStorage.isLogged = false;
        // this.rootPage = LoginComponent;
    };
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        console.warn('dallin@example.net', 'secret');
        if (typeof localStorage.isLogged === 'undefined' || localStorage.isLogged === "false") {
            this.rootPage = LoginComponent;
        }
        else {
            this.rootPage = MainboardComponent;
        }
        this.comm.disableMenu.subscribe(function (val) {
            _this.enabled = (val === 'enable');
            if (val === 'logout')
                _this.logout();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, MenuController,
            CommunicationProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map