import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any[], order: "asc" | "desc" = "asc"): typeof value {
    const result = [...value];
    
    type Val = typeof value[number];
    const cmp: (a: Val, b: Val) => 1 | -1
      = order == "asc"
      ? (a, b) => a > b ? 1 : -1
      : (a, b) => a < b ? 1 : -1;

    result.sort(cmp);
    return result;
  }

}
