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
import { AlertController, IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from "../shared/services/data.provider";
import { UserService } from "../shared/services/user.service";
import { CommunicationProvider } from "../shared/services/communication ";
import { CreateTaskModal } from "../mainboard/createTaskPopover/createTask";
/**
 * Generated class for the AddSkillModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectTaskModal = /** @class */ (function () {
    function SelectTaskModal(navCtrl, navParams, data, comm, user, modalCtrl, alertCtrl, viewCtrl) {
        // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.comm = comm;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
    }
    SelectTaskModal.prototype.ngOnInit = function () {
        var _this = this;
        this.project = this.navParams.get('item');
        this.data.getTrelloTasks(this.project.id).subscribe(function (data) {
            console.log('tasks', data);
            console.log('project', _this.project);
            _this.projectLists = data;
        });
    };
    SelectTaskModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    SelectTaskModal.prototype.save = function () {
        this.viewCtrl.dismiss({ item: 'data' });
    };
    SelectTaskModal.prototype.newTask = function () {
        var _this = this;
        var modal = this.modalCtrl.create(CreateTaskModal, { projectLists: this.projectLists, project: this.project });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data && data.item) {
                _this.projectLists.find(function (item) { return item.name === 'DOING'; }).tasks.unshift(data.item);
                _this.viewCtrl.dismiss({ item: data.item });
            }
        });
    };
    SelectTaskModal.prototype.startTask = function (list, task) {
        var _this = this;
        console.log('list', list);
        console.log('started', task);
        var cred = {
            task_name: task.name,
            trello_task_id: task.id,
            description: task.desc,
            trello_link: task.shortUrl,
            listName: this.projectLists.find(function (item) { return item.name === 'DOING'; }).name,
            listId: this.projectLists.find(function (item) { return item.name === 'DOING'; }).trello_id
        };
        console.log(cred, 'asdsadasd');
        this.user.startTask(cred, this.project.id).subscribe(function (data) {
            _this.viewCtrl.dismiss({ item: data });
        });
        // let prompt = this.alertCtrl.create({
        //   title: "Enter time",
        //   inputs: [
        //     {
        //       name: 'time',
        //       placeholder: 'time for task (hours)',
        //     }
        //   ],
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'Save',
        //       handler: data => {
        //         if (data.time.trim().length === 0) this.comm.toast('Fill all inputs pls')
        //         else {
        //           data.time = (data.time * 60)*60;
        //           let cred = {
        //             task_name: task.name,
        //             trello_task_id: task.id,
        //             description: task.desc,
        //             trello_link: task.shortUrl,
        //             time_for_work: data.time,
        //             listName: this.projectLists.find(item => item.name === 'DOING').name,
        //             listId: this.projectLists.find(item => item.name === 'DOING').trello_id
        //         }
        //         console.log(cred, 'asdsadasd')
        //           this.user.startTask(cred, this.project.id).subscribe((data) => {
        //             this.viewCtrl.dismiss({item: data});
        //
        //           });
        //
        //         }
        //
        //       }
        //     }
        //   ]
        // });
        // prompt.present();
    };
    SelectTaskModal = __decorate([
        IonicPage(),
        Component({
            selector: 'select-task-modal',
            templateUrl: 'selectTask.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DataProvider,
            CommunicationProvider,
            UserService,
            ModalController,
            AlertController,
            ViewController])
    ], SelectTaskModal);
    return SelectTaskModal;
}());
export { SelectTaskModal };
//# sourceMappingURL=selectTask.js.map