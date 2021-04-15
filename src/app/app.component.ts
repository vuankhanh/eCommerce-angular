import { Component } from '@angular/core';
import { AddIconSvgService } from './services/add-icon-svg.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public information: any={
    phoneNumber: '0974017030',
    urlFacebook: 'https://www.facebook.com/ccrtuthan',
    urlZalo: 'https://zalo.me/',
  };
  constructor(
    private addIconSvgService: AddIconSvgService
  ){
    this.addIconSvgService.addIcon();
  }
}
