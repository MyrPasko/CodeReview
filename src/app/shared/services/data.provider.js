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
var DataProvider = /** @class */ (function () {
    function DataProvider(request, toast) {
        this.request = request;
        this.toast = toast;
        // super(request, toast);
        // this.service_name = 'user';
    }
    DataProvider.prototype.getProjects = function () {
        var _this = this;
        return this.request.get(COMMON_URL.trello.myProjects)
            .pipe(tap(function (data) {
            // console.log('My current projects:', data)
            _this.projects = data;
        }, function () {
        }));
    };
    DataProvider.prototype.getTrelloTasks = function (id) {
        return this.request.get(COMMON_URL.trello.projects + "/" + id + COMMON_URL.trello.trelloLists)
            .pipe(tap(function (data) {
        }, function (err) {
            console.log(err);
        }));
    };
    DataProvider.prototype.getMyTasks = function (lastDays) {
        if (lastDays === void 0) { lastDays = 7; }
        return this.request.get("" + COMMON_URL.trello.myTasks + lastDays)
            .pipe(tap(function (data) {
        }, function (err) {
            console.log(err);
        }));
    };
    DataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RequestService, ToastController])
    ], DataProvider);
    return DataProvider;
}());
export { DataProvider };
//# sourceMappingURL=data.provider.js.map