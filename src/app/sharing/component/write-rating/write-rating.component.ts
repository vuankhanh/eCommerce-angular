import { Component, EventEmitter, OnInit, Output } from '@angular/core';

const totalNumberOfStars = 5;
@Component({
  selector: 'app-write-rating',
  templateUrl: './write-rating.component.html',
  styleUrls: ['./write-rating.component.scss']
})
export class WriteRatingComponent implements OnInit {
  @Output() emitRating = new EventEmitter<number>();
  totalNumberOfStars = Array(totalNumberOfStars).fill(null).map((value, index)=>index+1);

  mouseIndex: number = -1;
  rateSelection: number = this.mouseIndex;

  constructor() { }

  ngOnInit(): void {
  }

  mouseenter(event: MouseEvent, index: number){
    if(this.mouseIndex <= index){
      this.rateSelection=index;
    }
  }

  mouseleave(event: MouseEvent){
    this.rateSelection = this.mouseIndex;
  }

  setRateSelection(index: number){
    this.mouseIndex = index;
    this.rateSelection = this.mouseIndex;
    this.emitRating.emit(this.mouseIndex);
  }

}
