import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTaskModal } from './createTask';

@NgModule({
  declarations: [
    CreateTaskModal,
  ],
  imports: [
    IonicPageModule.forChild(CreateTaskModal),
  ],
})
export class CreateTaskModalPageModule {}
