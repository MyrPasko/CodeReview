var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from "../../shared/services/data.provider";
import { CommunicationProvider } from "../../shared/services/communication ";
import { UserService } from "../../shared/services/user.service";
var CreateTaskModal = /** @class */ (function () {
    function CreateTaskModal(navCtrl, navParams, data, comm, user, modalCtrl, renderer, alertCtrl, viewCtrl) {
        // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.comm = comm;
        this.user = user;
        this.modalCtrl = modalCtrl;
        this.renderer = renderer;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.taskCreation = {
            task_name: '',
            description: '',
            time_for_work: null,
            listId: null
        };
        this.time_for_work = '';
    }
    CreateTaskModal.prototype.ngOnInit = function () {
        this.projectLists = this.navParams.get('projectLists');
        this.project = this.navParams.get('project');
    };
    CreateTaskModal.prototype.createTask = function () {
        var _this = this;
        if (this.taskCreation.task_name.trim().length > 0 &&
            this.taskCreation.description.trim().length > 0 &&
            this.time_for_work.trim().length > 0) {
            this.taskCreation.time_for_work = (parseInt(this.time_for_work) * 60) * 60;
            if (this.projectLists)
                this.taskCreation.listId = this.projectLists.find(function (item) { return item.name === 'DOING'; }).trello_id; //todo fix
            console.log(this.taskCreation);
            this.user.crateTask(this.taskCreation, this.project.id).subscribe(function (data) {
                data.name = data.task_name;
                data.desc = data.description;
                _this.viewCtrl.dismiss({ item: data });
            });
        }
        else
            this.comm.toast('Fill all inputs pls');
    };
    CreateTaskModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    CreateTaskModal = __decorate([
        IonicPage(),
        Component({
            selector: 'create-task-modal',
            templateUrl: 'createTask.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DataProvider,
            CommunicationProvider,
            UserService,
            ModalController,
            Renderer,
            AlertController,
            ViewController])
    ], CreateTaskModal);
    return CreateTaskModal;
}());
export { CreateTaskModal };
//# sourceMappingURL=createTask.js.map