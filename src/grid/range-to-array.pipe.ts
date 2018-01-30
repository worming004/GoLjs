import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'rangeToArray'})
export class RangeToArrayPipe implements PipeTransform {
  transform(range, args:string[]) : any {
    let result = [];
    for (let i = 0; i < range; i++) {
        result.push(i);
      }
      return result;
  }
}