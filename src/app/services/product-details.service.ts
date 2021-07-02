import { Injectable } from '@angular/core';

import { ProductList, Product } from '../mock-data/products';
import { ProductDetails, ProductDetail } from '../models/Product-detail';
import { Gallerys, Album, Item } from '../mock-data/gallery';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private products: Array<Product>;
  private productDetails: Array<ProductDetail>;
  private gallerys: Array<Album>;
  constructor() {
    this.products = ProductList;
    this.productDetails = ProductDetails;
    this.gallerys = Gallerys;
  }


  getProductInformation(productId: number): Product | null{
    for(let productItem of this.products){
      if(productItem.id === productId){
        productItem.productDetail = this.getProductDetail(productId);
        productItem.albumImg = this.getProductDetailImgAlbum(productId);
        return productItem;
      }
    }
    return null;
  }

  getProductDetail(productId: number): ProductDetail | null{
    for(let productDetail of this.productDetails){
      if(productDetail.id === productId){
        return productDetail;
      }
    }
    return null;
  }

  getProductDetailImgAlbum(albumId: number): Array<Item> | []{
    for(let album of this.gallerys){
      if(album.id === albumId){
        album.albumImg = this.sortAlbum(album.albumImg)
        return album.albumImg;
      }
    }
    return [];
  }

  sortAlbum(album: Array<Item>){
    let sortAlbum: Array<Item> = [];
    for(const [i, v] of album.entries()){
      if(v.isMain){
        sortAlbum.unshift(v);
      }else{
        if(v){
          sortAlbum.push(v);
        }
      }
    }
    return sortAlbum;
  }
}
