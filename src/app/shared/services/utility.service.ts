import {Injectable} from "@angular/core";

import {LoginComponent} from "../../../pages/login/login.component";
import {App} from "ionic-angular";
import {MyApp} from "../../app.component";


@Injectable()

export class UtilityService {


  constructor(
              public app: App) {

  }

  dof () {
    console.log('123')
  }

  public logout () {
    let nav = this.app.getActiveNav();
    // there is also this.app.getRootNav()

    nav.setRoot(MyApp);
  }


}
