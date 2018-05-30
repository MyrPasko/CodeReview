import {Injectable} from "@angular/core";
import {EntityService} from "./entity.service";
import {RequestService} from "./request.service";
import {COMMON_URL} from "./common.url";
import {ToastController} from "ionic-angular";
import {COMMON_MSG} from "./common.messages";
import {tap} from "rxjs/operators";

@Injectable()

export class DataProvider  {
projects: any[];

    constructor(public request: RequestService, public toast: ToastController) {
        // super(request, toast);
        // this.service_name = 'user';
    }

    public getProjects () {
        return this.request.get(COMMON_URL.trello.myProjects)
            .pipe(
                tap(
                    (data: any[])=>{
                        // console.log('My current projects:', data)
                        this.projects = data;
                    },
                    ()=>{

                    }
                )
            )
    }

  public getTrelloTasks(id) {
    return this.request.get(`${COMMON_URL.trello.projects}/${id}${COMMON_URL.trello.trelloLists}`)
      .pipe(
        tap(data => {
          },
          err => {
            console.log(err);
          })
      );
  }

  public getMyTasks(lastDays: number = 7) {
    return this.request.get(`${COMMON_URL.trello.myTasks}${lastDays}`)
      .pipe(
        tap(data => {
          },
          err => {
            console.log(err);
          })
      );
  }

}
