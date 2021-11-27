import { Pipe, PipeTransform } from '@angular/core';
import { hostConfiguration } from '../../../environments/environment';
@Pipe({
  name: 'galleryRoute'
})
export class GalleryRoutePipe implements PipeTransform {
  private urlHost: string = hostConfiguration.rootHost;
  transform(value: unknown, ...args: unknown[]): string {
    return this.urlHost+'/gallery/'+value;
  }

}
