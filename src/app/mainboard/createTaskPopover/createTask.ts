import {Component, OnInit, Renderer} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../../shared/services/data.provider";
import {CommunicationProvider} from "../../shared/services/communication ";
import {UserService} from "../../shared/services/user.service";

@IonicPage()
@Component({
  selector: 'create-task-modal',
  templateUrl: 'createTask.html',
})
export class CreateTaskModal implements OnInit {
  taskCreation = {
    task_name: '',
    description: '',
    time_for_work: null,
    listId: null
  };
  time_for_work='';
  project: any;
  projectLists: any;


  ngOnInit() {
      this.projectLists =this.navParams.get('projectLists');
      this.project = this.navParams.get('project');
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public data: DataProvider,
              public comm: CommunicationProvider,
              public user: UserService,
              public modalCtrl: ModalController,
              public renderer: Renderer,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController) {

    // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);


  }

  createTask() {
    if (this.taskCreation.task_name.trim().length > 0 &&
      this.taskCreation.description.trim().length > 0 &&
      this.time_for_work.trim().length > 0) {
      this.taskCreation.time_for_work = (parseInt(this.time_for_work) * 60)*60;
      if (this.projectLists)this.taskCreation.listId = this.projectLists.find(item => item.name === 'DOING').trello_id; //todo fix
      console.log(this.taskCreation)
      this.user.crateTask(this.taskCreation, this.project.id).subscribe((data: any) => {
        data.name = data.task_name;
        data.desc = data.description;
        this.viewCtrl.dismiss({item: data});
      });
    } else this.comm.toast('Fill all inputs pls')
  }


  cancel() {
    this.viewCtrl.dismiss()
  }


}
