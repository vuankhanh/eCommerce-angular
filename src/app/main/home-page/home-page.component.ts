import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('appHeader', { read: ElementRef }) appHeader: ElementRef;
  @ViewChild('appSlideShow', { read: ElementRef }) appSlideShow: ElementRef;
  @ViewChild('appAboutUs', { read: ElementRef }) appAboutUs: ElementRef;
  // @ViewChildren('appAboutUs', {read: ElementRef}) appAboutUs: QueryList<ElementRef>;
  innerHeight: number;
  heightAppAboutUs: number;
  constructor(
    private ren: Renderer2
  ) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.componentCalcSize();
    }, 150);
  }

  onResize(){
    this.componentCalcSize();
  }

  componentCalcSize(){
    let heightAppHeader: number = this.appHeader.nativeElement.offsetHeight
    let heightAppSlideShow: number = this.appSlideShow.nativeElement.offsetHeight;
    this.heightAppAboutUs = this.innerHeight - (heightAppHeader + heightAppSlideShow);
  }
}
