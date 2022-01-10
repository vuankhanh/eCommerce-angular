import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, isDevMode, Renderer2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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
    @Inject(DOCUMENT) private _document: Document,
    private renderer2: Renderer2,
    private mouseEventEmitService: MouseEventEmitService,
    private mainContainerScrollService: MainContainerScrollService,
    private appService: AppServicesService
  ){
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(){
    this.listenIsMobile();
    this.setScroll();

    if(!isDevMode() && this.isBrowser){
      this.setMetaTagForFacebook();
    }
  }

  setMetaTagForFacebook(){
    let scriptPixel = this.renderer2.createElement('script');
    scriptPixel.type = `text/javascript`;
    scriptPixel.text = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '219934090324074');
    fbq('track', 'PageView');`;

    let scriptNoScript = this.renderer2.createElement('noscript');
    scriptNoScript.inner = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=219934090324074&ev=PageView&noscript=1"
    />`;

    let scriptMessage = this.renderer2.createElement('script');
    scriptMessage.type = `text/javascript`;
    scriptMessage.text = `
      window.fbAsyncInit = function() {
        FB.init({
          appId            : '583183603050614',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v12.0'
        });
      };
    
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    `;

    let fbCustomerChat = this.renderer2.createElement('div');
    fbCustomerChat.setAttribute('class', 'fb-customerchat');
    fbCustomerChat.setAttribute('page_id', '104868241888740');
    
    this.renderer2.appendChild(this._document.head, scriptPixel);
    this.renderer2.appendChild(this._document.head, scriptNoScript);
    this.renderer2.appendChild(this._document.body, scriptMessage);
    this.renderer2.appendChild(this._document.body, fbCustomerChat);
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

  onScroll = (event: any): void => {
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
    });
  }
}