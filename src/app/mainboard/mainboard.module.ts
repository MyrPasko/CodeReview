import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule} from 'ionic-angular';

import {HttpClientModule} from "@angular/common/http";
import {MainboardComponent} from "./mainboard.component";

import {InfoPage} from "../../pages/info/info";
import {ProfilePage} from "../../pages/profile/profile";
import {FriendsPage} from "../../pages/friends/friends";
import {HomePage} from "../../pages/home/home";

import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SelectTaskModal} from "../selectTaskPopover/selectTask";
import {MinuteSecondsPipe} from "../../pipes/minute-seconds/minute-seconds";
import {TimeStringPipe} from "../../pipes/time-string/time-string";
import {OrderByPipe} from "../../pipes/order-by/order-by";
import {CreateTaskModal} from "./createTaskPopover/createTask";
import {TaskDetailPopover} from "./taskDetailPopover/taskDetail";


@NgModule({
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
export class MainboardModule {
}
