import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit {
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ngOnInit() {

  }

}
