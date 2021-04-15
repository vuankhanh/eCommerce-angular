import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: { maps: { MapTypeId: { ROADMAP: any; }; Map: new (arg0: any, arg1: { center: any; zoom: number; disableDefaultUI: boolean; mapTypeControl: boolean; streetViewControl: boolean; zoomControl: boolean; fullscreenControl: boolean; mapTypeId: any; styles: { featureType: string; stylers: { visibility: string; }[]; }[]; }) => any; Marker: new (arg0: { map: any; position: any; }) => any; }; };

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false })
  mapElement!: ElementRef;
  map: any;
  tuThanPosition = {lat: 20.963251, lng: 105.826472};
  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.addMap(this.tuThanPosition);
  }

  addMap(currentPos:any){
    console.log(currentPos);
    let mapOptions = {
      center: currentPos,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let currentMarker = new google.maps.Marker({
      map: this.map,
      position: currentPos
    });

  }

}
