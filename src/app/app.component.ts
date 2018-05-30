import {Component, OnInit, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';

import {MainboardComponent} from "./mainboard/mainboard.component";
import {LoginComponent} from "../pages/login/login.component";
import {MenuController} from 'ionic-angular';
import {CommunicationProvider} from "./shared/services/communication ";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any }>
  enabled = true;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController,
              public comm: CommunicationProvider,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // this.pages = [
    //   { title: 'List', component: ListPage }
    // ];
  }

  logout() {
    console.log('123')
    this.nav.setRoot(LoginComponent);
    this.enabled = false;
    localStorage.isLogged = false;
    // this.rootPage = LoginComponent;
  }

  ngOnInit() {
    console.warn('dallin@example.net', 'secret');
    if ( typeof localStorage.isLogged === 'undefined' ||localStorage.isLogged === "false" ) {
      this.rootPage = LoginComponent;
    } else {
      this.rootPage = MainboardComponent;
    }
    this.comm.disableMenu.subscribe((val) => {
      this.enabled = (val === 'enable');
      if (val === 'logout') this.logout();
    })


  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

