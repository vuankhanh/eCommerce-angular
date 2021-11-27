import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResponseLogin } from '../../../services/api/login.service';
@Component({
  selector: 'app-check-account-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  historyModalComponent: Array<string> = [];
  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeLogin
  ) { }

  ngOnInit(): void {
    this.historyModalComponent.push(this.data.type);
  }

  changeComponent(event: any){
    if(event === 'login' || event === 'registerSuccessful' || event === 'forgotPasswordSuccessful'){
      this.historyModalComponent = [];
      this.historyModalComponent.push(event);
    }else{
      this.historyModalComponent.push(event);
    }
    this.data.type = event;
  }

  back(){
    if(this.historyModalComponent.length>1){
      this.historyModalComponent.pop();
      this.data.type = this.historyModalComponent[this.historyModalComponent.length-1];
    }
  }

  closeModal(value: ResponseLogin){
    this.dialogRef.close(value);
  }

}

export interface TypeLogin{
  type: string
}
