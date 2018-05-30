import {Component, OnInit} from '@angular/core';
import {ProfilePage} from '../profile/profile';
import {InfoPage} from '../info/info';
import {HomePage} from '../home/home';
import {FriendsPage} from "../friends/friends";




@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = InfoPage;
  tab4Root = FriendsPage;


  constructor() {

  }


  ngOnInit() {

  }
}
