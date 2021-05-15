import { Component } from '@angular/core';

import { ContactInfor, ContactInformation } from './mock-data/contact-information';

import { AddIconSvgService } from './services/add-icon-svg.service';
import { MouseEventEmitService } from './services/mouse-event-emit.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public contactInformation: ContactInformation;
  constructor(
    private addIconSvgService: AddIconSvgService,
    private mouseEventEmitService: MouseEventEmitService
  ){
    this.addIconSvgService.addIcon();
    this.contactInformation = ContactInfor;
    console.log(this.contactInformation);
    
  }
  onActivate() {
    window.scroll({
      top: 0,
      behavior: 'smooth' 
    });
  }

  mouseEventEmit(event: MouseEvent){
    // console.log(event.type);
    if(event.type === 'mouseenter'){
      this.mouseEventEmitService.set(true);
    }else if(event.type === 'mouseleave'){
      this.mouseEventEmitService.set(false);
    }
  }
}
