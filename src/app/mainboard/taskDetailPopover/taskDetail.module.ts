import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailPopover } from './taskDetail';

@NgModule({
  declarations: [
    TaskDetailPopover,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailPopover),
  ],
})
export class CreateTaskModalPageModule {}
