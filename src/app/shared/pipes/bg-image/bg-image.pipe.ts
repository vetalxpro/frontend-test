import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bgImage'
})
export class BgImagePipe implements PipeTransform {

  transform( value: string ): string {
    return value ? `url(${value})` : '';
  }

}
