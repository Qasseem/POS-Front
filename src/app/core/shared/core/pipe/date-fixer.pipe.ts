import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFixer',
})
export class DateFixerPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return value ? value + 'Z' : value;
  }
}
