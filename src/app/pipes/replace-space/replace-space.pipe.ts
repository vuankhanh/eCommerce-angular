import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpace'
})
export class ReplaceSpacePipe implements PipeTransform {

  transform(value: any): string {
    return value.replace(/\s/g, '');
  }
}
