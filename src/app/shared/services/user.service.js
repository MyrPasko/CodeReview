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
var UserService = /** @class */ (function () {
    function UserService(request, comm, toast) {
        this.request = request;
        this.comm = comm;
        this.toast = toast;
        // super(request, toast);
        // this.service_name = 'user';
    }
    // public edit(data: Object) {
    //     data['passport'] = data['passport'] ? 1 : 0;
    //     return this.request.put(COMMON_URL.user.update, data)
    //         .do(data => {
    //                 if (data.status) {
    //                     this.showNotification('success', COMMON_MSG[this.service_name].update);
    //                 }
    //                 else {
    //                     this.incorrectValidationErrors(data.error);
    //                 }
    //             },
    //             err => {
    //                 console.log(err);
    //             });
    // }
    UserService.prototype.startTask = function (creds, id) {
        return this.request.post(COMMON_URL.trello.projects + "/" + id + "/tasks", creds);
    };
    UserService.prototype.stopTask = function (creds, taskId, boardId) {
        return this.request.put(COMMON_URL.trello.projects + "/" + boardId + "/tasks/" + taskId, creds);
    };
    UserService.prototype.crateTask = function (creds, boardId) {
        var _this = this;
        return this.request.post(COMMON_URL.trello.projects + "/" + boardId + "/" + COMMON_URL.trello.createTask, creds).pipe(tap(function () {
        }, function () {
            _this.comm.toast('error');
        }));
    };
    UserService.prototype.setTrelloKey = function (key) {
        var _this = this;
        return this.request.put(COMMON_URL.trello.setKey, {
            trello_token: key
        }).pipe(tap(function () {
        }, function () {
            _this.comm.toast('error');
        }));
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RequestService,
            CommunicationProvider,
            ToastController])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map