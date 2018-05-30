import {Injectable} from "@angular/core";
import {EntityService} from "./entity.service";
import {RequestService} from "./request.service";
import {COMMON_URL} from "./common.url";
import {ToastController} from "ionic-angular";
import {COMMON_MSG} from "./common.messages";
import {tap} from "rxjs/operators";
import {CommunicationProvider} from "./communication ";

@Injectable()

export class UserService {


  constructor(public request: RequestService,
              public comm: CommunicationProvider,
              public toast: ToastController) {
    // super(request, toast);
    // this.service_name = 'user';
  }

  // public edit(data: Object) {
  //     data['passport'] = data['passport'] ? 1 : 0;
  //     return this.request.put(COMMON_URL.user.update, data)
  //         .do(data => {
  //                 if (data.status) {
  //                     this.showNotification('success', COMMON_MSG[this.service_name].update);
  //                 }
  //                 else {
  //                     this.incorrectValidationErrors(data.error);
  //                 }
  //             },
  //             err => {
  //                 console.log(err);
  //             });
  // }

 public  startTask (creds, id) {
   return this.request.post(`${COMMON_URL.trello.projects}/${id}/tasks`, creds);
 }

 public  stopTask (creds, taskId, boardId) {
   return this.request.put(`${COMMON_URL.trello.projects}/${boardId}/tasks/${taskId}`, creds);
 }

 public  crateTask (creds, boardId) {
   return this.request.post(`${COMMON_URL.trello.projects}/${boardId}/${COMMON_URL.trello.createTask}`, creds).pipe(
     tap(
       ()=>{

       },
       ()=>{
         this.comm.toast('error')
       }
     )
   )
 }

  public  setTrelloKey (key) {
    return this.request.put(COMMON_URL.trello.setKey, {
      trello_token: key
    }).pipe(
      tap(
        ()=>{

        },
        ()=>{
          this.comm.toast('error')
        }
      )
    )
  }

}
