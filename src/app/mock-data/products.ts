export const ProductList: Array<Product> = [
    {
      id: 1,
      name:'Sản phẩm 1',
      category: 1,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-1.png',
      album: [],
      description: 'Đây là sản phẩm 1',
      highlight: true
    },
    { 
      id: 2,
      name:'Sản phẩm 2',
      category: 1,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-2.png',
      album: [],
      description: 'Đây là sản phẩm 2',
      highlight: true
    },
    {
      id: 3,
      name:'Sản phẩm 3',
      category: 1,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 3',
      highlight: false
    },
    {
      id: 4,
      name:'Sản phẩm 4',
      category: 1,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-4.png',
      album: [],
      description: 'Đây là sản phẩm 4',
      highlight: true
    },
    {
      id: 5,
      name:'Sản phẩm 5',
      category: 2,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 5',
      highlight: false
    },
    {
      id: 6,
      name:'Sản phẩm 6',
      category: 2,
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 6',
      highlight: false
    }
];


export interface Product{
  id: number,
  name: string,
  category: number,
  thumbnail: string,
  imgBanner: string,
  album: Array<string>,
  description: string,
  highlight: boolean,
  quantity?: number
}