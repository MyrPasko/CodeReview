import {EventEmitter, Injectable, Output} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()

export class CommunicationProvider {
  @Output() disableMenu = new EventEmitter<string>();

  menuControll(val) {
    this.disableMenu.emit(val);
  }

  toast(msg: string, cssClass: string = 'error', position: string = 'top',) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: position,
      cssClass: cssClass,
      duration: 2500,
      dismissOnPageChange: false
    });
    toast.present();
  }


  constructor(public toastCtrl: ToastController) {
  }

}
