var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainboardComponent } from "../../app/mainboard/mainboard.component";
import { AuthService } from "../../app/shared/services/auth.service";
import { CommunicationProvider } from "../../app/shared/services/communication ";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { FormBuilder, Validators } from "@angular/forms";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(navCtrl, auth, iab, formBuilder, comm) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.iab = iab;
        this.formBuilder = formBuilder;
        this.comm = comm;
        this.user = {
            email: '',
            password: ''
        };
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.maxLength(30),
                    Validators.pattern('^[A-Z0-9a-z\\._%±]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'),
                    Validators.required])],
            password: ['', Validators.compose([
                    Validators.maxLength(30),
                    Validators.minLength(6),
                    Validators.required
                ])],
        });
        this.isActive = true;
    }
    LoginComponent.prototype.openBrowser = function (token) {
        var url = "http://api.code-review.grassbusinesslabs.tk/api/trello_autorize?query=" + token;
        console.log(url);
        var browser = this.iab.create(url, "_blank");
        // this.iab.create(url, "_blank");
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe(function (success) {
                console.log('Logining success', success);
                localStorage.token = success['data']['api_token'];
                // this.openBrowser(success['data']['trello_token']);
                _this.openBrowser(success['data']['api_token']);
                localStorage.isLogged = true;
                _this.comm.menuControll('enable');
                _this.navCtrl.setRoot(MainboardComponent);
            }, function (error) {
                console.error(error);
            });
        }
        else {
            this.comm.toast("Please enter valid data");
        }
    };
    LoginComponent.prototype.showPass = function () {
        this.isActive = !this.isActive;
    };
    LoginComponent = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: './login.component.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AuthService,
            InAppBrowser,
            FormBuilder,
            CommunicationProvider])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map