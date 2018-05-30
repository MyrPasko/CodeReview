import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController,
              public app: App) {

  }

 logout () {
   this.app.getRootNavs()[0].setRoot(LoginComponent);
   // && this.auth.logout();
 }
}
