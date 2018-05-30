import {Component} from '@angular/core';

import {AlertController, NavController} from 'ionic-angular';
import {RegistrationComponent} from "../registration/registration.component";
import {MainboardComponent} from "../../app/mainboard/mainboard.component";
import {AuthService} from "../../app/shared/services/auth.service";
import {CommunicationProvider} from "../../app/shared/services/communication ";
import {UserService} from "../../app/shared/services/user.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {FormBuilder, Validators} from "@angular/forms";


export declare interface loginCredentials {
  email: string,
  password: string
}

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public isActive: boolean;
  public user: loginCredentials = {
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController,
              public auth: AuthService,
              private iab: InAppBrowser,
              public formBuilder: FormBuilder,
              public comm: CommunicationProvider,) {
    this.isActive = true;
  }

  loginForm = this.formBuilder.group({
    email: ['', Validators.compose(
      [Validators.maxLength(30),
        Validators.pattern('^[A-Z0-9a-z\\._%±]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'),
        Validators.required])],
    password: ['', Validators.compose([
      Validators.maxLength(30),
      Validators.minLength(6),
      Validators.required])],

  });

  openBrowser(token) {
    let url = `http://api.code-review.grassbusinesslabs.tk/api/trello_autorize?query=${token}`;
    console.log(url);
    const browser = this.iab.create(url, "_blank");
    // this.iab.create(url, "_blank");

  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        success => {
          console.log('Logining success', success);
          localStorage.token = success['data']['api_token'];
          // this.openBrowser(success['data']['trello_token']);
          this.openBrowser(success['data']['api_token']);
          localStorage.isLogged = true;
          this.comm.menuControll('enable');
          this.navCtrl.setRoot(MainboardComponent);
        },
        error => {
          console.error(error)
        }
      )
    } else {
      this.comm.toast("Please enter valid data")
    }
  }

  showPass() {
    this.isActive = !this.isActive;
  }

}
