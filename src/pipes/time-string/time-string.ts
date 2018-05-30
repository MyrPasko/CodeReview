import {Pipe, PipeTransform} from '@angular/core';

/*
* The pipe converts quantity of seconds to string like this:
* '10 hours 25 minutes'
* */

@Pipe({
  name: 'timeString',
})
export class TimeStringPipe implements PipeTransform {
  transform(value: number): string {
    let seconds: number;
    let minutes: number;
    let hours: number;
    seconds = value;
    minutes = (seconds>=60 ?  Math.floor(seconds / 60) : 0);
    hours = (minutes >= 60 ? Math.floor(minutes / 60) : 0);

    return (hours > 0 ? (hours + 'h ') : ' ') +
      (minutes > 0 ? ((minutes - hours * 60) + 'min') : '0min');

    // return (hours > 0 ? (hours < 10 ? '0' + hours : hours) : '00') + ':' +
    //   ((minutes - hours * 60) < 10 ? '0' : '') + (minutes - hours * 60) + ':' +
    //   ((seconds - minutes * 60) < 10 ? '0' : '') + (seconds - minutes * 60);

  }
}
