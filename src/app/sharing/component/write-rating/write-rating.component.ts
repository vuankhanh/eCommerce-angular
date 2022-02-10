import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Rating } from 'src/app/models/ServerConfig';

import { ConfigService } from 'src/app/services/api/config.service';

import { Subscription } from 'rxjs';

const totalNumberOfStars = 5;
@Component({
  selector: 'app-write-rating',
  templateUrl: './write-rating.component.html',
  styleUrls: ['./write-rating.component.scss']
})
export class WriteRatingComponent implements OnInit {
  totalNumberOfStars = Array(totalNumberOfStars).fill(null).map((value, index)=>index+1);

  ratingForm: FormGroup;

  mouseIndex: number = -1;
  rateSelection: number = this.mouseIndex;
  ratingTitle: string;

  ratings: Array<Rating>;

  subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.listenConfig();
    this.initForm();
  }

  listenConfig(){
    this.subscription.add(
      this.configService.getConfig().subscribe(res=>{
        this.ratings = res.rating;
        this.setRatingTitle(this.ratings);
      })
    )
  }

  initForm(){
    let phoneNumberRegEx = /((0)+([0-9]{9})\b)/g;
    this.ratingForm = this.formBuilder.group({
      clientInformation: this.formBuilder.group({
        name: ['', Validators.required],
        phoneNumber: ['', { validators: [Validators.required, Validators.pattern(phoneNumberRegEx)], updateOn: 'blur' }],
      }),
      rating: [0, Validators.required],
      content: ['']
    })
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
    this.setRatingTitle(this.ratings);
    this.ratingForm.controls['rating'].setValue(this.mouseIndex);
  }

  setRatingTitle(ratings: Array<Rating>){
    ratings.forEach(rating=>{
      if(rating.value === this.rateSelection){
        this.ratingTitle = rating.title;
      }
    })
  }

  sendReviews(){
    if(this.ratingForm.valid){
      console.log(this.ratingForm.value);
    }
  }

}
