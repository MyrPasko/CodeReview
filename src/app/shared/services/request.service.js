var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import * as queryString from 'query-string';
import { catchError, tap } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { CommunicationProvider } from "./communication ";
var RequestService = /** @class */ (function () {
    function RequestService(http, comm) {
        this.http = http;
        this.comm = comm;
    }
    /**
     *
     * @param url
     * @param credentials
     * @param options
     * @returns {Observable<ArrayBuffer>}
     */
    RequestService.prototype.post = function (url, credentials) {
        var _this = this;
        return this.http.post(url, credentials)
            .pipe(tap(function () {
        }, function (err) {
            console.log(err, 'allo');
            // todo implement functionality that will logout user if trello token expired
            // if(error.status === 500){
            //   this.comm.menuControll('logout')
            // }
            _this.comm.toast("Server error " + err.status, 'error');
        }), catchError(this.handleError));
    };
    /**
     *
     * @param url
     * @param body
     * @returns {Observable<ArrayBuffer>}
     */
    RequestService.prototype.get = function (url, body) {
        var _this = this;
        if (body === void 0) { body = null; }
        if (body !== null) {
            if (Object.keys(body).length > 0) {
                url += '?' + queryString.stringify(body);
            }
        }
        return this.http.get(url)
            .pipe(tap(function () {
        }, function (err) {
            // if(error.status === 500) this.comm.menuControll('logout') ;
            _this.comm.toast("Server error " + err.status, 'error');
        }), catchError(this.handleError));
    };
    /**
     *
     * @param url
     * @param credentials
     * @param options
     * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
     */
    RequestService.prototype.put = function (url, credentials) {
        return this.http.put(url, credentials)
            .pipe(catchError(this.handleError));
    };
    /**
     * DELETE is reserved, I'm using destroy
     * @param url
     * @param options
     * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
     */
    RequestService.prototype.destroy = function (url) {
        return this.http.delete(url)
            .pipe(catchError(this.handleError));
    };
    RequestService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error) +
                ("Error is: " + error));
            console.dir(error);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error);
    };
    ;
    RequestService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            CommunicationProvider])
    ], RequestService);
    return RequestService;
}());
export { RequestService };
//# sourceMappingURL=request.service.js.map