import { Component, OnInit, ViewChild } from '@angular/core';

import { MainContainerScrollService } from './services/main-container-scroll.service';
import { MouseEventEmitService } from './services/mouse-event-emit.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private mouseEventEmitService: MouseEventEmitService,
    private mainContainerScrollService: MainContainerScrollService
  ){
    
  }

  ngOnInit(){
    const colors = new Map([
      ['primary-background', '#5470ff'],
      ['secondary-background', '#37b5ff'],
      ['normal-text', '#0a5185'],
      ['hightlight-text', '#001727']
    ])

    Array.from(colors.entries()).forEach(([name, value]) => {
      document.body.style.setProperty(`--${name}`, value);
    })
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

  onScroll = (event: Event): void => {
    let target: HTMLDivElement = <HTMLDivElement>event.target;
    let index: number = target.scrollTop;

    this.mainContainerScrollService.setPosition(index);
  };
}
