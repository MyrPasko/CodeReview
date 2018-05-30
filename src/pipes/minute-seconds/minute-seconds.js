var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the MinuteSecondsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var MinuteSecondsPipe = /** @class */ (function () {
    function MinuteSecondsPipe() {
    }
    MinuteSecondsPipe.prototype.transform = function (value) {
        var seconds;
        var minutes;
        var hours;
        seconds = value;
        minutes = (seconds >= 60 ? Math.floor(seconds / 60) : 0);
        hours = (minutes >= 60 ? Math.floor(minutes / 60) : 0);
        return (hours > 0 ? (hours < 10 ? '0' + hours : hours) : '00') + ':' +
            ((minutes - hours * 60) < 10 ? '0' : '') + (minutes - hours * 60) + ':' +
            ((seconds - minutes * 60) < 10 ? '0' : '') + (seconds - minutes * 60);
    };
    MinuteSecondsPipe = __decorate([
        Pipe({
            name: 'minuteSeconds',
        })
    ], MinuteSecondsPipe);
    return MinuteSecondsPipe;
}());
export { MinuteSecondsPipe };
//# sourceMappingURL=minute-seconds.js.map