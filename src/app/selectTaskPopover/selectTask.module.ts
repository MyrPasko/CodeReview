import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTaskModal } from './selectTask';

@NgModule({
  declarations: [
    SelectTaskModal,
  ],
  imports: [
    IonicPageModule.forChild(SelectTaskModal),
  ],
})
export class AddSkillModalsPageModule {}
