import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.scss']
})
export class PaymentSuccessfulComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentSuccessfulComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order
  ) { }

  ngOnInit(): void {
    console.log(this.order);
  }

  goOrderHistory(){
    this.dialogRef.close('goOrderHistory');
  }

}
