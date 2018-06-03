import {Component, OnInit, Renderer} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../shared/services/data.provider";
import {UserService} from "../shared/services/user.service";
import {CommunicationProvider} from "../shared/services/communication ";
import {CreateTaskModal} from "../mainboard/createTaskPopover/createTask";

/**
 * Generated class for the AddSkillModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'select-task-modal',
  templateUrl: 'selectTask.html',
})
export class SelectTaskModal implements OnInit {
  project: any;
  projectLists: any;

  ngOnInit() {
    this.project = this.navParams.get('item');
    this.data.getTrelloTasks(this.project.id).subscribe((data) => {
      console.log('tasks', data);
      console.log('project', this.project);
      this.projectLists = data;
    })
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public data: DataProvider,
              public comm: CommunicationProvider,
              public user: UserService,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController) {

    // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);


  }


  cancel() {
    this.viewCtrl.dismiss()
  }

  save() {
    this.viewCtrl.dismiss({item: 'data'});
  }

  newTask() {
    let modal = this.modalCtrl.create(CreateTaskModal, {projectLists: this.projectLists, project: this.project});
    modal.present();
    modal.onDidDismiss(data => {
      if(data && data.item){
        this.projectLists.find(item => item.name === 'DOING').tasks.unshift(data.item);
        this.viewCtrl.dismiss({item: data.item});
      }
    })
  }

  startTask(list, task) {
    console.log('list', list);
    console.log('started', task);
    let cred = {
      task_name: task.name,
      trello_task_id: task.id,
      description: task.desc,
      trello_link: task.shortUrl,
      listName: this.projectLists.find(item => item.name === 'DOING').name,
      listId: this.projectLists.find(item => item.name === 'DOING').trello_id
    };
    console.log(cred, 'asdsadasd');
    this.user.startTask(cred, this.project.id).subscribe((data) => {
      this.viewCtrl.dismiss({item: data});
      console.log('Just started task',data);

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


  }

}
