import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
<<<<<<< HEAD

=======
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class AddIconSvgService {
  private urlSvgs = [
<<<<<<< HEAD
    'assets/logo/svg/zalo.svg',
    'assets/logo/svg/gmap.svg',
    'assets/logo/svg/star.svg',
    'assets/logo/svg/facebook.svg',
    'assets/logo/svg/google-plus.svg',
    'assets/logo/svg/zalo.svg',
    'assets/logo/svg/lock-reset',
    'assets/logo/svg/empty-cart.svg',
    'assets/logo/svg/discount.svg'
=======
    '../assets/logo/svg/zalo.svg',
    '../assets/logo/svg/gmap.svg',
    '../assets/logo/svg/star.svg',
    '../assets/logo/svg/facebook.svg',
    '../assets/logo/svg/google-plus.svg',
    '../assets/logo/svg/zalo.svg',
    '../assets/logo/svg/lock-reset',
    '../assets/logo/svg/empty-cart.svg',
    '../assets/logo/svg/discount.svg'
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
  ];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
<<<<<<< HEAD
  ) {}
=======
  ) {

  }
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60

  public addIcon(){
    for(let i=0; i<this.urlSvgs.length; i++){
      this.matIconRegistry.addSvgIcon(this.getNameSvg(this.urlSvgs[i]), this.sanitizer.bypassSecurityTrustResourceUrl(this.urlSvgs[i]));
    }
  }

  private getNameSvg(urlSvg: string){
    let splitUrl = urlSvg.split("/");
    return splitUrl[splitUrl.length-1].split(".")[0];
  }
}
