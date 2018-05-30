import {NgModule} from '@angular/core';
import {KeysPipe} from './keys/keys';
import {MinuteSecondsPipe} from './minute-seconds/minute-seconds';
import {OrderByPipe} from './order-by/order-by';
import {TimeStringPipe} from "./time-string/time-string";

@NgModule({
  declarations: [KeysPipe,
    MinuteSecondsPipe,
    OrderByPipe,
    TimeStringPipe],
  imports: [],
  exports: [KeysPipe,
    MinuteSecondsPipe,
    OrderByPipe,
    TimeStringPipe]
})
export class PipesModule {
}
