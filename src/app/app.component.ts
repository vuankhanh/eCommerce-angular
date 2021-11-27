<<<<<<< HEAD
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

=======
import { Component, OnInit, ViewChild } from '@angular/core';
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
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
<<<<<<< HEAD
  isBrowser: boolean;
  isMobile: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
=======
  isMobile: boolean = false;
  constructor(
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
    private mouseEventEmitService: MouseEventEmitService,
    private mainContainerScrollService: MainContainerScrollService,
    private appService: AppServicesService
  ){
<<<<<<< HEAD
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(){
=======

    // this.socketIoService.getTheRemainingAmoutChange().subscribe(res=>{
    //   console.log(res);
    // },error=>{
    //   console.log(error)
    // })
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

>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
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
<<<<<<< HEAD
    if(this.isBrowser){
      window.scroll({
        top: 0,
        behavior: 'smooth' 
      });
    }
=======
    window.scroll({
      top: 0,
      behavior: 'smooth' 
    });
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
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
