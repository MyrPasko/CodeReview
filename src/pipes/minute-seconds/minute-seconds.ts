import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the MinuteSecondsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    let seconds: number;
    let minutes: number;
    let hours: number;
    seconds = value;
    minutes = (seconds>=60 ?  Math.floor(seconds / 60) : 0);
    hours = (minutes >= 60 ? Math.floor(minutes / 60) : 0);

    return (hours > 0 ? (hours < 10 ? '0' + hours : hours) : '00') + ':' +
      ((minutes - hours * 60) < 10 ? '0' : '') + (minutes - hours * 60) + ':' +
      ((seconds - minutes * 60) < 10 ? '0' : '') + (seconds - minutes * 60);

  }
}
