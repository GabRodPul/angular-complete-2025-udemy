import { Pipe, PipeTransform } from '@angular/core';

type Temps = "c" | "f"

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null, 
    inp:   Temps, 
    out?:  Temps
  ): string | null {
    if (value === null) return value;

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

      default:
        temp = val;
    }

    const letter = out ? out : inp;

    return `${temp!.toFixed(2)} º${letter.toUpperCase()}`;
  }
}
