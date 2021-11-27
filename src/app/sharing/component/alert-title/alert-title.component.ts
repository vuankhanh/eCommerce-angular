import { Component, OnInit } from '@angular/core';

import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-alert-title',
  templateUrl: './alert-title.component.html',
  styleUrls: ['./alert-title.component.scss']
})
export class AlertTitleComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AlertTitleComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
