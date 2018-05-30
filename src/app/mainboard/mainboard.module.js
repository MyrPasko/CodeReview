var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { MainboardComponent } from "./mainboard.component";
import { InfoPage } from "../../pages/info/info";
import { ProfilePage } from "../../pages/profile/profile";
import { FriendsPage } from "../../pages/friends/friends";
import { HomePage } from "../../pages/home/home";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SelectTaskModal } from "../selectTaskPopover/selectTask";
import { MinuteSecondsPipe } from "../../pipes/minute-seconds/minute-seconds";
import { TimeStringPipe } from "../../pipes/time-string/time-string";
import { OrderByPipe } from "../../pipes/order-by/order-by";
import { CreateTaskModal } from "./createTaskPopover/createTask";
import { TaskDetailPopover } from "./taskDetailPopover/taskDetail";
var MainboardModule = /** @class */ (function () {
    function MainboardModule() {
    }
    MainboardModule = __decorate([
        NgModule({
            declarations: [
                MainboardComponent,
                HomePage,
                FriendsPage,
                ProfilePage,
                InfoPage,
                SelectTaskModal,
                CreateTaskModal,
                TaskDetailPopover,
                MinuteSecondsPipe,
                TimeStringPipe,
                OrderByPipe
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                IonicModule.forRoot(MainboardComponent),
                LoadingBarHttpClientModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MainboardComponent,
                HomePage,
                FriendsPage,
                ProfilePage,
                InfoPage,
                SelectTaskModal,
                CreateTaskModal,
                TaskDetailPopover,
            ],
            providers: [
                InAppBrowser,
                MinuteSecondsPipe,
                OrderByPipe
            ]
        })
    ], MainboardModule);
    return MainboardModule;
}());
export { MainboardModule };
//# sourceMappingURL=mainboard.module.js.map