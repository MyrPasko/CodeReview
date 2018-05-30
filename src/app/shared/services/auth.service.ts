import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {COMMON_URL} from "./common.url";
import {loginCredentials} from "../../../pages/login/login.component";
import {EntityService} from "./entity.service";
import {ToastController} from "ionic-angular";
import {Entity} from "./entity.interface";
import {Observable} from "rxjs/Observable";
import {HttpResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {UserService} from "./user.service";
import {CommunicationProvider} from "./communication ";



@Injectable()
export class AuthService {

  constructor(private request: RequestService,
              private toastCtrl: ToastController,
              private comm: CommunicationProvider,
             ) {
  }

  login(credentials: loginCredentials): Observable<any> {
    return this.request.post(COMMON_URL.auth.login, credentials)
      .pipe(
        tap(
          (res) => {
            // this.user.setUser(res.data);
          },
          (err) => {
            this.comm.toast(`Server error ${err.status}: ${err.error.message}`, 'error');
            console.log(err.message)
          })
      )

  }

  logout() {
    return this.request.get(COMMON_URL.auth.logout);
  }


}
