import { Pipe, PipeTransform } from '@angular/core';

type Temps = "c" | "f"

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number, inp: Temps, out?: Temps): unknown {
    const val = typeof value === "string"
            ? parseFloat(value)
            : value;

    let temp;
    switch (true) {
      case inp === "c" && out === "f": {
        temp = val * (9 / 5) + 32;
      } break;

      case inp === "f" && out === "c": {
        temp = (val - 32) * (5 / 9);
      } break;
    }

    const letter = out ? out : inp;

    return `${temp} º${letter.toUpperCase()}`;
  }
}
