var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DataProvider } from "../shared/services/data.provider";
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SelectTaskModal } from "../selectTaskPopover/selectTask";
import { UserService } from "../shared/services/user.service";
import { TaskDetailPopover } from "./taskDetailPopover/taskDetail";
var MainboardComponent = /** @class */ (function () {
    function MainboardComponent(iab, dataProvider, user, modalCtrl, alertCtrl) {
        this.iab = iab;
        this.dataProvider = dataProvider;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
    }
    MainboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataProvider.getProjects().subscribe(function (data) {
            _this.projects = data;
            console.log('My projects:', _this.projects);
        });
        this.dataProvider.getMyTasks().subscribe(function (data) {
            console.log('My history:', data);
            _this.history = data;
            _this.history.forEach(function (item) {
                _this.getTotalTime(item);
                if (item.tasks.length > 0 && !item.tasks[0].finish_time) {
                    _this.runTimer(item.tasks[0]);
                }
            });
        });
    };
    MainboardComponent.prototype.getTotalTime = function (day) {
        var interval = setInterval(function () {
            var allSeconds = 0;
            day.totalTime = 0;
            day.tasks.forEach(function (task) {
                allSeconds = allSeconds + task.real_work_time;
            });
            day.totalTime = allSeconds;
        }, 1000);
    };
    MainboardComponent.prototype.taskDetails = function (task) {
        var modal = this.modalCtrl.create(TaskDetailPopover, { item: task });
        modal.present();
    };
    MainboardComponent.prototype.showModal = function (object) {
        var _this = this;
        var modal = this.modalCtrl.create(SelectTaskModal, { item: object });
        modal.onDidDismiss(function (data) {
            if (data && data.item) {
                data.item.real_work_time = 1;
                data.item.finish_time = null;
                if (_this.history.length > 0 && _this.history[0].tasks.length > 0) {
                    _this.history[0].tasks[0].finish_time = 1;
                }
                // let tmpTask = this.history.find(item=> item.tasks[0].finish_time === null);
                // if(tmpTask.tasks[0].finish_time) tmpTask.tasks[0].finish_time = 1;
                if (_this.history.find(function (item) { return item.date === _this.getDate(); })) {
                    _this.history[0].tasks.unshift(data.item);
                }
                else {
                    _this.history.unshift({
                        date: _this.getDate(),
                        tasks: [data.item]
                    });
                }
                _this.runTimer(_this.history[0].tasks[0]);
            }
        });
        modal.present();
    };
    MainboardComponent.prototype.selectProject = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select project');
        this.projects.forEach(function (item, index) {
            alert.addInput({
                type: 'radio',
                label: item.name,
                value: item,
                checked: index === 0
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                _this.showModal(data);
            }
        });
        alert.present();
    };
    MainboardComponent.prototype.startTimer = function (task) {
        var _this = this;
        this.history.forEach(function (item) {
            item.tasks.forEach(function (task) {
                task.finish_time = 1;
            });
        });
        this.dataProvider.getTrelloTasks(task.project_id).subscribe(function (data) {
            console.log('My trello tasks:', data);
            var alert2 = _this.alertCtrl.create();
            alert2.setTitle('Move previous task ...');
            data.forEach(function (item) {
                alert2.addInput({
                    type: 'radio',
                    label: item.name,
                    value: item,
                });
            });
            alert2.addButton('Cancel');
            alert2.addButton({
                text: 'Ok',
                handler: function (responce) {
                    var alert = _this.alertCtrl.create();
                    alert.setTitle('Move to ...');
                    data.forEach(function (item) {
                        alert.addInput({
                            type: 'radio',
                            label: item.name,
                            value: item,
                        });
                    });
                    alert.addButton('Cancel');
                    alert.addButton({
                        text: 'Ok',
                        handler: function (data) {
                            task.finish_time = null;
                            task.status = data.name;
                            _this.user.startTask({
                                previousListId: responce.trello_id,
                                previousListName: responce.name,
                                task_name: task.task_name,
                                trello_task_id: task.trello_task_id,
                                description: task.description,
                                trello_link: task.trello_link,
                                time_for_work: task.time_for_work,
                                listName: data.name,
                                listId: data.trello_id,
                            }, task.project_id).subscribe(function () {
                                _this.runTimer(task);
                            });
                        }
                    });
                    alert.present();
                }
            });
            alert2.present();
        });
    };
    MainboardComponent.prototype.stopTimer = function (task) {
        var _this = this;
        this.dataProvider.getTrelloTasks(task.project_id).subscribe(function (data) {
            console.log('My trello tasks:', data);
            var alert = _this.alertCtrl.create();
            alert.setTitle('Move to ...');
            data.forEach(function (item) {
                alert.addInput({
                    type: 'radio',
                    label: item.name,
                    value: item,
                    checked: item.name === 'Testing'
                });
            });
            alert.addButton('Cancel');
            alert.addButton({
                text: 'Ok',
                handler: function (data) {
                    _this.user.stopTask({
                        listId: data.trello_id,
                        listName: data.name
                    }, task.id, task.project_id).subscribe(function () {
                        task.finish_time = 1;
                        clearInterval(_this.timerFnc);
                    });
                }
            });
            alert.present();
        });
    };
    MainboardComponent.prototype.getDate = function () {
        var date = new Date();
        var formatedDate = (date.getUTCDate().toString().length === 1 ? '0' + date.getUTCDate() : date.getUTCDate())
            + "." +
            ((date.getUTCMonth() + 1).toString().length === 1 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1)
            + "." +
            (date.getFullYear() + '').substring(2);
        return formatedDate;
    };
    MainboardComponent.prototype.runTimer = function (task) {
        clearInterval(this.timerFnc);
        this.timerFnc = setInterval(function (x) {
            task.real_work_time++;
        }, 1000);
    };
    MainboardComponent = __decorate([
        Component({
            selector: 'page-mainboard',
            templateUrl: 'mainboard.component.html'
        }),
        __metadata("design:paramtypes", [InAppBrowser,
            DataProvider,
            UserService,
            ModalController,
            AlertController])
    ], MainboardComponent);
    return MainboardComponent;
}());
export { MainboardComponent };
//# sourceMappingURL=mainboard.component.js.map