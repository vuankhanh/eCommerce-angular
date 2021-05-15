export const ProductList: Array<Product> = [
    {
      id: 1,
      code: 'sp1-0002',
      name:'Sản phẩm 1',
      category: 1,
      price: 150000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-1.png',
      album: [],
      description: 'Đây là sản phẩm 1',
      highlight: true
    },
    { 
      id: 2,
      code: 'sp2-0005',
      name:'Sản phẩm 2',
      category: 1,
      price: 120000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-2.png',
      album: [],
      description: 'Đây là sản phẩm 2',
      highlight: true
    },
    {
      id: 3,
      code: 'sp3-0005',
      name:'Sản phẩm 3',
      category: 1,
      price: 250000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 3',
      highlight: false
    },
    {
      id: 4,
      code: 'sp4-0005',
      name:'Sản phẩm 4',
      category: 1,
      price: 220000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-4.png',
      album: [],
      description: 'Đây là sản phẩm 4',
      highlight: true
    },
    {
      id: 5,
      code: 'sp5-0005',
      name:'Sản phẩm 5',
      category: 2,
      price: 190000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 5',
      highlight: false
    },
    {
      id: 6,
      code: 'sp6-00021',
      name:'Sản phẩm 6',
      category: 2,
      price: 220000,
      currencyUnit: '&#8363;',
      unit: 'kg',
      thumbnail: '../../assets/products/others/oc-chuoi-dau.jpg',
      imgBanner: '../../assets/imgs/banners/banner-3.png',
      album: [],
      description: 'Đây là sản phẩm 6',
      highlight: false
    }
];


export interface Product{
  id: number,
  code: string,
  name: string,
  category: number,
  price: number,
  currencyUnit: string,
  unit: string,
  thumbnail: string,
  imgBanner: string,
  album: Array<string>,
  description: string,
  highlight: boolean,
  quantity?: number
}