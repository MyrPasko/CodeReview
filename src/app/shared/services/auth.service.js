var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";
import { COMMON_URL } from "./common.url";
import { ToastController } from "ionic-angular";
import { tap } from "rxjs/operators";
import { CommunicationProvider } from "./communication ";
var AuthService = /** @class */ (function () {
    function AuthService(request, toastCtrl, comm) {
        this.request = request;
        this.toastCtrl = toastCtrl;
        this.comm = comm;
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        return this.request.post(COMMON_URL.auth.login, credentials)
            .pipe(tap(function (res) {
            // this.user.setUser(res.data);
        }, function (err) {
            _this.comm.toast("Server error " + err.status + ": " + err.error.message, 'error');
            console.log(err.message);
        }));
    };
    AuthService.prototype.logout = function () {
        return this.request.get(COMMON_URL.auth.logout);
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RequestService,
            ToastController,
            CommunicationProvider])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map