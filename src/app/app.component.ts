import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AppServicesService } from './services/app-services.service';
import { MainContainerScrollService } from './services/main-container-scroll.service';
import { MouseEventEmitService } from './services/mouse-event-emit.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild ('drawer') drawer: MatSidenav;
  isMobile: boolean = false;
  constructor(
    private mouseEventEmitService: MouseEventEmitService,
    private mainContainerScrollService: MainContainerScrollService,
    private appService: AppServicesService
  ){
  }

  ngOnInit(){
    const colors = new Map([
      ['primary-background', '#5470ff'],
      ['secondary-background', '#37b5ff'],
      ['tertiary-background', '#333333'],
      ['normal-text', '#0a5185'],
      ['hightlight-text', '#001727'],
      ['normal-border', 'rgba(84, 112, 255, 0.3)'],
      ['ahamove-normal-text', '#16254e']
    ]);

    Array.from(colors.entries()).forEach(([name, value]) => {
      document.body.style.setProperty(`--${name}`, value);
    });

    this.listenIsMobile();
  }

  listenIsMobile(){
    this.appService.isMobile$.subscribe(res=>{
      this.isMobile = res;
    })
  }

  toggle(event: any){
    this.drawer.toggle();
  }

  onActivate() {
    window.scroll({
      top: 0,
      behavior: 'smooth' 
    });
  }

  mouseEventEmit(event: MouseEvent){
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
