import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): unknown {
    let val = typeof value === "string"
            ? parseFloat(value)
            : value;

    val = val * (9 / 5) + 32;

    return `${val} ºF`;
  }
}
