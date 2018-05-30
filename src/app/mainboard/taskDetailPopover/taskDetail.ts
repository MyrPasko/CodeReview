import {Component, OnInit, Renderer} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../../shared/services/data.provider";
import {CommunicationProvider} from "../../shared/services/communication ";
import {UserService} from "../../shared/services/user.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'detail-task-modal',
  templateUrl: 'taskDetail.html',
})
export class TaskDetailPopover implements OnInit {
task;

  ngOnInit() {
      this.task =this.navParams.get('item');
      console.log(this.task)
      // this.project = this.navParams.get('project');
  }

  constructor(
              public navParams: NavParams,
              public data: DataProvider,
              private iab: InAppBrowser,
              public user: UserService,
              public viewCtrl: ViewController) {
  }

  createTask() {

        this.viewCtrl.dismiss({item: ''});

  }


  cancel() {
    this.viewCtrl.dismiss()
  }

  openTrello() {
    const browser = this.iab.create(this.task.trello_link, "_blank");
  }


}
