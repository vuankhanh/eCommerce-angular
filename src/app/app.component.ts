import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MatDrawerContent, MatSidenav } from '@angular/material/sidenav';

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
  @ViewChild ('drawerContent') drawercontent: MatDrawerContent;
  isBrowser: boolean;
  isMobile: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private mouseEventEmitService: MouseEventEmitService,
    private mainContainerScrollService: MainContainerScrollService,
    private appService: AppServicesService
  ){
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(){
    this.listenIsMobile();
    this.setScroll();
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
    if(this.isBrowser){
      window.scroll({
        top: 0,
        behavior: 'smooth' 
      });
    }
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
    this.mainContainerScrollService.setPositionTop(index);
  };

  setScroll(){
    this.mainContainerScrollService.listenDirectionPostion$.subscribe(res=>{
      if(res){
        if(res.direction === 'x'){
          this.drawercontent.scrollTo({ left: res.position, behavior: "smooth" });
        }else if(res.direction === 'y'){
          this.drawercontent.scrollTo({ top: res.position, behavior: "smooth" })
        }
      }
    })
    
  }
}
