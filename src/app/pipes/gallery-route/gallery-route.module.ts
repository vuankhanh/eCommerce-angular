import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutePipe } from './gallery-route.pipe';

@NgModule({
  declarations: [GalleryRoutePipe],
  imports: [
    CommonModule
  ],exports: [GalleryRoutePipe]
})
export class GalleryRouteModule { }
