import { Component, Input, OnInit, } from '@angular/core';

const totalNumberOfStars = 5;
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() ratingValue: number;
  
  ratingValueFloor: number;
  totalNumberOfStars = Array(totalNumberOfStars).fill(null).map((value, index)=>index+1);
  constructor() { }

  ngOnInit(): void {
    this.ratingValueFloor = Math.floor(this.ratingValue);
  }

}
