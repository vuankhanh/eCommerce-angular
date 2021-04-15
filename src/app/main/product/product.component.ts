import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductionsComponent implements OnInit {
  products = [
    {
      id: 1,
      name:'Sản phẩm 1',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 1'
    },
    { 
      id: 2,
      name:'Sản phẩm 2',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 2'
    },
    {
      id: 3,
      name:'Sản phẩm 3',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 3'
    },
    {
      id: 4,
      name:'Sản phẩm 4',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 4'
    },
    {
      id: 5,
      name:'Sản phẩm 5',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 5'
    },
    {
      id: 6,
      name:'Sản phẩm 6',
      src: '../../assets/products/others/oc-chuoi-dau.jpg',
      description: 'Đây là sản phẩm 6'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
