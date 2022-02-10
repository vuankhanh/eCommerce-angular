import { Component, Input, OnInit, } from '@angular/core';
import { Rating } from 'src/app/models/ServerConfig';
import { ConfigService } from 'src/app/services/api/config.service';

const totalNumberOfStars = 5;
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() ratingValue: number;
  @Input() showRatingTitle: boolean;
  
  ratingValueFloor: number;
  totalNumberOfStars = Array(totalNumberOfStars).fill(null).map((value, index)=>index+1);
  ratingTitle: string;
  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.ratingValueFloor = Math.floor(this.ratingValue);
    if(this.showRatingTitle){
      this.listenConfig();
    }
  }

  listenConfig(){
    this.configService.getConfig().subscribe(res=>{
      let ratings = res.rating;
      ratings.forEach(rating=>{
        if(rating.value === this.ratingValueFloor){
          this.ratingTitle = rating.title;
        }
      })
    })
  }

}
