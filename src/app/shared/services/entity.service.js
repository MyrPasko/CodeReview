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
import { COMMON_URL } from './common.url';
import { RequestService } from './request.service';
import { COMMON_MSG } from './common.messages';
import { ToastController } from "ionic-angular";
// declare const $: any;
var EntityService = /** @class */ (function () {
    function EntityService(request, toastCtrl) {
        this.request = request;
        this.toastCtrl = toastCtrl;
    }
    /**
     *
     * @returns {Promise<TResult|ArrayBuffer>|Promise<ArrayBuffer>}
     */
    EntityService.prototype.get = function (id, data) {
        if (id === void 0) { id = null; }
        if (data === void 0) { data = null; }
        if (id == null) {
            return this.request.get(COMMON_URL[this.service_name].index, data);
        }
        else {
            return this.request.get(COMMON_URL[this.service_name].index + '/' + id, data);
        }
    };
    /**
     *
     * @param data
     * @returns {Promise<TResult|ArrayBuffer>|Promise<ArrayBuffer>}
     */
    EntityService.prototype.create = function (data) {
        var _this = this;
        return this.request.post(COMMON_URL[this.service_name].create, data)
            .do(function () {
            _this.showNotification('success', COMMON_MSG[_this.service_name].create);
        }, function (err) {
            _this.incorrectValidationErrors(err.error.error);
        });
    };
    /**
     *
     * @param data
     * @param id
     * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
     */
    EntityService.prototype.edit = function (data, id) {
        var _this = this;
        if (id === void 0) { id = null; }
        return this.request.put(COMMON_URL[this.service_name].create + '/' + id, data)
            .do(function () {
            _this.showNotification('success', COMMON_MSG[_this.service_name].update);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param id
     * @returns {any}
     */
    EntityService.prototype.destroy = function (id) {
        var _this = this;
        return this.request.destroy(COMMON_URL[this.service_name].index + '/' + id)
            .do(function () {
            _this.showNotification('success', COMMON_MSG[_this.service_name].delete);
        });
    };
    EntityService.prototype.showNotification = function (type, message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    EntityService.prototype.incorrectValidationErrors = function (errors) {
        var errorMsg = "";
        for (var i in errors) {
            var obj = errors[i];
            errorMsg += obj + " ";
        }
        this.showNotification('error', errorMsg);
    };
    EntityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RequestService, ToastController])
    ], EntityService);
    return EntityService;
}());
export { EntityService };
//# sourceMappingURL=entity.service.js.map