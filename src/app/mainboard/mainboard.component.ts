import {Component, OnInit} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {DataProvider} from "../shared/services/data.provider";
import {AlertController} from 'ionic-angular';
import {ModalController, ViewController} from 'ionic-angular';
import {SelectTaskModal} from "../selectTaskPopover/selectTask";
import {UserService} from "../shared/services/user.service";
import {TaskDetailPopover} from "./taskDetailPopover/taskDetail";


@Component({
  selector: 'page-mainboard',
  templateUrl: 'mainboard.component.html'
})
export class MainboardComponent implements OnInit {
  // play = true;
  projects: any[];                              // хранилище для перчня доступных проектов
  history: any[];                               // хранилище для 7 последних дней с тасками.
  currentTaskId: number;                        // хранилище для остановки таймера.
  timerFnc;                                     // хранилище для таймера

  constructor(private iab: InAppBrowser,
              public dataProvider: DataProvider,
              public user: UserService,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.dataProvider.getProjects().subscribe((data) => {                   // получаем перечень проектов, к которым есть доступ в трелло
      this.projects = data;
      console.log('My projects:', this.projects);
    });
    this.dataProvider.getMyTasks().subscribe((data: any[]) => {             // получаем семь последних дней с тасками (они запомнены)
      console.log('My history:', data);
      this.history = data;
      this.history.forEach((currentDay, index) => {

        // цепляем маркер для навешивания таймера ТОЛЬКО на сегодняшний день, и для деактивации иконок запуска таймеров на других днях
        if (index === 0) {
          currentDay.currentDay = 1;
          console.log('First current day');
          setInterval(() => {
            this.getTotalTime(currentDay)
          }, 1000);
        } else {
          currentDay.currentDay = 0;
          this.getTotalTime(currentDay);
        }
        // запускает таймер первого задания в списке сегодняшнего дня при входе в приложение
        if (currentDay.tasks.length > 0 && !currentDay.tasks[0].finish_time) {
          this.currentTaskId = currentDay.tasks[0].id;
          this.runTimer(currentDay.tasks[0]);
          // currentDay.tasks[0].finish_time = 1;

        }
      });
    });
  }

  // функция собирает отработанное время по таскам одного дня и записывает результат в специальное свойство для каждого дня.
  getTotalTime(day): void {
    let allSeconds = 0;
    day.totalTime = 0;
    day.tasks.forEach((task) => {
      // if (task.real_work_time === null) task.real_work_time = 1;
      allSeconds = allSeconds + task.current_day_time;
    });
    // console.log(day.date, allSeconds);
    day.totalTime = allSeconds;
  }


  // ЭТО ПОПОВЕР!!!!! типа переход на детальное описание таски
  taskDetails(task) {
    let modal = this.modalCtrl.create(TaskDetailPopover, {item: task});
    modal.present();
  }

  showModal(object) {
    let modal = this.modalCtrl.create(SelectTaskModal, {item: object});
    modal.onDidDismiss(data => {
      if (data && data.item) {
        console.log(data);
        data.item.real_work_time = 1;
        data.item.finish_time = null;

        this.currentTaskId = data.item.id;
        console.log('Current Task ID from showModal:', this.currentTaskId);
        if (this.history.length > 0 && this.history[0].tasks.length > 0) {
          this.history[0].tasks[0].finish_time = 1;
        }
        // let tmpTask = this.history.find(item=> item.tasks[0].finish_time === null);
        // if(tmpTask.tasks[0].finish_time) tmpTask.tasks[0].finish_time = 1;
        if (this.history.find(item => item.date === this.getDate())) {

          this.history[0].tasks.unshift(data.item);
          console.log('Are you mother fuckers readY???');
        } else {
          this.history.unshift({
            date: this.getDate(),
            tasks: [data.item]
          })
        }
        this.runTimer(this.history[0].tasks[0]);
      }
    });
    modal.present();
  }

  selectProject() {                                       // срабатывает на зеленой кнопке внизу.
    let alert = this.alertCtrl.create();
    alert.setTitle('Select project');
    this.projects.forEach((item, index) => {
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
      handler: (data: any) => {
        this.showModal(data);
      }
    });
    alert.present();
  }

  startTimer(task) {

    console.log('Start timer');
    this.history.forEach(item => {
      item.tasks.forEach(task => {
        task.finish_time = 1;
      })
    });
    this.user.startTask({
      task_name: task.task_name,
      trello_task_id: task.trello_task_id,
      description: task.description,
      trello_link: task.trello_link,
      time_for_work: task.time_for_work,               // бесполезная херня.
    }, task.project_id).subscribe((res) => {
      task.finish_time = null;
      task.status = 'DOING';
      console.log('Result:', res);
      console.log(res);
      this.currentTaskId = res.id;
      this.runTimer(task)
    })

  }

  runTimer(task) {
    clearInterval(this.timerFnc);
    this.timerFnc = setInterval(x => {
      // console.log(task.real_work_time);
      task.current_day_time++;
      task.summ_time++;
    }, 1000);
  }

  stopTimer(task) {
    console.log('Stop Timer');
    this.dataProvider.getTrelloTasks(task.project_id).subscribe((data: any[]) => {   // получаем перечень папок в трелло проекта

      // console.log('My trello tasks:', data);

      let alert = this.alertCtrl.create();
      alert.setTitle('Move task to:');


      data.forEach((item) => {
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
        handler: (folder: any) => {
          console.log(folder);
          this.user.stopTask({
            listId: folder.trello_id,
            listName: folder.name
          }, this.currentTaskId, task.project_id).subscribe(() => {
            task.finish_time = 1;
            task.status = folder.name;
            console.log(folder);
            console.log(task);
            clearInterval(this.timerFnc);
          })
        }
      });
      alert.present();
    })
  }

  getDate() {                                                                          // тут не трогать, все нормально
    let date = new Date();
    let formatedDate =
      (date.getUTCDate().toString().length === 1 ? '0' + date.getUTCDate() : date.getUTCDate())
      + "." +
      ((date.getUTCMonth() + 1).toString().length === 1 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1)
      + "." +
      (date.getFullYear() + '').substring(2);
    return formatedDate;
  }


}

// import {Component, OnInit} from '@angular/core';
// import {InAppBrowser} from '@ionic-native/in-app-browser';
// import {DataProvider} from "../shared/services/data.provider";
// import {AlertController} from 'ionic-angular';
// import {ModalController, ViewController} from 'ionic-angular';
// import {SelectTaskModal} from "../selectTaskPopover/selectTask";
// import {UserService} from "../shared/services/user.service";
// import {TaskDetailPopover} from "./taskDetailPopover/taskDetail";
//
//
// @Component({
//   selector: 'page-mainboard',
//   templateUrl: 'mainboard.component.html'
// })
// export class MainboardComponent implements OnInit {
//   // play = true;
//   projects: any[];                              // хранилище для перчня доступных проектов
//   history: any[];                               // хранилище для 7 последних дней с тасками.
//   // project;
//   timerFnc;                                     // хранилище для таймера
//
//   constructor(private iab: InAppBrowser,
//               public dataProvider: DataProvider,
//               public user: UserService,
//               public modalCtrl: ModalController,
//               private alertCtrl: AlertController) {
//   }
//
//   ngOnInit() {
//     this.dataProvider.getProjects().subscribe((data) => {                   // получаем перечень проектов, к которым есть доступ в трелло
//       this.projects = data;
//       console.log('My projects:', this.projects);
//     });
//     this.dataProvider.getMyTasks().subscribe((data: any[]) => {             // получаем семь последних дней с тасками (они запомнены)
//       console.log('My history:', data);
//       this.history = data;
//       this.history.forEach((item) => {
//         this.getTotalTime(item);
//         if (item.tasks.length > 0 && !item.tasks[0].finish_time) {
//           this.runTimer(item.tasks[0]);
//         }
//       });
//     });
//   }
//
//   getTotalTime(day) {
//     let interval = setInterval(() => {
//       let allSeconds = 0;
//       day.totalTime = 0;
//       day.tasks.forEach((task) => {
//         allSeconds = allSeconds + task.real_work_time;
//       });
//       day.totalTime = allSeconds;
//     }, 1000)
//   }
//
//   taskDetails(task) {
//     let modal = this.modalCtrl.create(TaskDetailPopover, {item: task});
//     modal.present();
//   }
//
//   showModal(object) {
//     let modal = this.modalCtrl.create(SelectTaskModal, {item: object});
//     modal.onDidDismiss(data => {
//       if (data && data.item) {
//         data.item.real_work_time = 1;
//         data.item.finish_time = null;
//         if (this.history.length > 0 && this.history[0].tasks.length > 0) {
//           this.history[0].tasks[0].finish_time = 1;
//         }
//         // let tmpTask = this.history.find(item=> item.tasks[0].finish_time === null);
//         // if(tmpTask.tasks[0].finish_time) tmpTask.tasks[0].finish_time = 1;
//         if (this.history.find(item => item.date === this.getDate())) {
//           this.history[0].tasks.unshift(data.item);
//         } else {
//           this.history.unshift({
//             date: this.getDate(),
//             tasks: [data.item]
//           })
//         }
//         this.runTimer(this.history[0].tasks[0]);
//       }
//     });
//     modal.present();
//   }
//
//   selectProject() {                                       // срабатывает на зеленой кнопке внизу.
//     let alert = this.alertCtrl.create();
//     alert.setTitle('Select project');
//     this.projects.forEach((item, index) => {
//       alert.addInput({
//         type: 'radio',
//         label: item.name,
//         value: item,
//         checked: index === 0
//       });
//     });
//     alert.addButton('Cancel');
//     alert.addButton({
//       text: 'Ok',
//       handler: (data: any) => {
//         this.showModal(data);
//       }
//     });
//     alert.present();
//   }
//
//
//   startTimer(task) {
//     this.history.forEach(item => {
//       item.tasks.forEach(task => {
//         task.finish_time = 1;
//       })
//     });
//     this.dataProvider.getTrelloTasks(task.project_id).subscribe((data: any[]) => {   // получаем перечень папок в трелло проекта
//
//       console.log('My trello tasks:', data);
//
//       let alert2 = this.alertCtrl.create();
//       alert2.setTitle('Move previous task ...');
//       data.forEach((item) => {
//         alert2.addInput({
//           type: 'radio',
//           label: item.name,
//           value: item,
//         });
//       });
//       alert2.addButton('Cancel');
//       alert2.addButton({
//         text: 'Ok',
//         handler: (responce: any) => {
//           let alert = this.alertCtrl.create();
//           alert.setTitle('Move to ...');
//           data.forEach((item) => {
//             alert.addInput({
//               type: 'radio',
//               label: item.name,
//               value: item,
//             });
//           });
//           alert.addButton('Cancel');
//           alert.addButton({
//             text: 'Ok',
//             handler: (data: any) => {
//               task.finish_time = null;
//               task.status = data.name;
//               this.user.startTask({
//                 previousListId: responce.trello_id,
//                 previousListName: responce.name,
//                 task_name: task.task_name,
//                 trello_task_id: task.trello_task_id,
//                 description: task.description,
//                 trello_link: task.trello_link,
//                 time_for_work: task.time_for_work,
//                 listName: data.name,
//                 listId: data.trello_id,
//               }, task.project_id).subscribe(() => {
//                 this.runTimer(task)
//               });
//             }
//           });
//           alert.present();
//
//         }
//       });
//       alert2.present();
//
//
//     })
//   }
//
//   runTimer(task) {
//     clearInterval(this.timerFnc);
//     this.timerFnc = setInterval(x => {
//       task.real_work_time++;
//     }, 1000);
//   }
//
//   stopTimer(task) {
//     this.dataProvider.getTrelloTasks(task.project_id).subscribe((data: any[]) => {   // получаем перечень папок в трелло проекта
//
//       console.log('My trello tasks:', data);
//
//       let alert = this.alertCtrl.create();
//       alert.setTitle('Move task to:');
//
//
//       data.forEach((item) => {
//         alert.addInput({
//           type: 'radio',
//           label: item.name,
//           value: item,
//           checked: item.name === 'Testing'
//         });
//       });
//       alert.addButton('Cancel');
//       alert.addButton({
//         text: 'Ok',
//         handler: (data: any) => {
//           this.user.stopTask({
//             listId: data.trello_id,
//             listName: data.name
//           }, task.id, task.project_id).subscribe(() => {
//             task.finish_time = 1;
//             clearInterval(this.timerFnc);
//           })
//         }
//       });
//       alert.present();
//     })
//   }
//
//   getDate() {
//     let date = new Date();
//     let formatedDate =
//       (date.getUTCDate().toString().length === 1 ? '0' + date.getUTCDate() : date.getUTCDate())
//       + "." +
//       ((date.getUTCMonth() + 1).toString().length === 1 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1)
//       + "." +
//       (date.getFullYear() + '').substring(2);
//     return formatedDate;
//   }
//
//
// }

