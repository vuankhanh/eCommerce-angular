import { Component, OnInit } from '@angular/core';

import { CustomerMenu, Menu } from 'src/app/mock-data/menu';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.scss']
})
export class MainCustomerComponent implements OnInit {
  customerMenu: Array<Menu>;
  constructor() {
    this.customerMenu = CustomerMenu;
  }

  ngOnInit(): void {
  }

}
