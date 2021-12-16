import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTagFacebook } from '../models/MetaTag';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(
    private title: Title, private meta: Meta
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTagFacebook(metaTag: MetaTagFacebook){
    this.meta.updateTag({ name: 'og:title', content: metaTag.title });
    this.meta.updateTag({ name: 'og:image', content: metaTag.image });
    this.meta.updateTag({ name: 'og:image:alt', content: metaTag.imageAlt });
    this.meta.updateTag({ name: 'og:image:type', content: metaTag.imageType });
    this.meta.updateTag({ name: 'og:image:width', content: metaTag.imageWidth });
    this.meta.updateTag({ name: 'og:image:height', content: metaTag.imageHeight });
    this.meta.updateTag({ name: 'og:image:description', content: metaTag.description });
  }
}
