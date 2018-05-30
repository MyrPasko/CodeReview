var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { NavController, ToastController } from "ionic-angular";
import { UserService } from "../../app/shared/services/user.service";
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(navCtrl, service, toastCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.toastCtrl = toastCtrl;
        this.user = {
            email: '',
            password: ''
        };
        this.isActive = true;
    }
    RegistrationComponent.prototype.goToLogin = function () {
        this.navCtrl.push(LoginComponent);
    };
    RegistrationComponent.prototype.registration = function () {
        // this.service.create(this.user)
        //     .subscribe(data => {
        //         this.navCtrl.push(LoginComponent);
        //     });
    };
    RegistrationComponent.prototype.showPass = function () {
        this.isActive = !this.isActive;
    };
    RegistrationComponent = __decorate([
        Component({
            selector: 'page-registration',
            templateUrl: './registration.component.html'
        }),
        __metadata("design:paramtypes", [NavController, UserService, ToastController])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map