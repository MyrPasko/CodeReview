var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventEmitter, Injectable, Output } from "@angular/core";
import { ToastController } from "ionic-angular";
var CommunicationProvider = /** @class */ (function () {
    function CommunicationProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
        this.disableMenu = new EventEmitter();
    }
    CommunicationProvider.prototype.menuControll = function (val) {
        this.disableMenu.emit(val);
    };
    CommunicationProvider.prototype.toast = function (msg, cssClass, position) {
        if (cssClass === void 0) { cssClass = 'error'; }
        if (position === void 0) { position = 'top'; }
        var toast = this.toastCtrl.create({
            message: msg,
            position: position,
            cssClass: cssClass,
            duration: 3000,
            dismissOnPageChange: false
        });
        toast.present();
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CommunicationProvider.prototype, "disableMenu", void 0);
    CommunicationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController])
    ], CommunicationProvider);
    return CommunicationProvider;
}());
export { CommunicationProvider };
//# sourceMappingURL=communication .js.map