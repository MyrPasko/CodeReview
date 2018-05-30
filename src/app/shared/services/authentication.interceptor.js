var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HttpHeaders, } from '@angular/common/http';
var AuthenticationInterceptor = /** @class */ (function () {
    function AuthenticationInterceptor() {
    }
    AuthenticationInterceptor.prototype.intercept = function (req, next) {
        if (typeof localStorage.token !== 'undefined') {
            var headers = new HttpHeaders()
                .set('Authorization', 'Bearer ' + localStorage.token);
            req = req.clone({ headers: headers });
        }
        return next.handle(req);
    };
    AuthenticationInterceptor = __decorate([
        Injectable()
    ], AuthenticationInterceptor);
    return AuthenticationInterceptor;
}());
export { AuthenticationInterceptor };
//# sourceMappingURL=authentication.interceptor.js.map