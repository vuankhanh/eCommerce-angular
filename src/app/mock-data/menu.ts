import { ProductCategorys, ProductCategory } from './products-category';

export const MenusList: Array<Menu> =
[
    {
        title: 'Trang chủ',
        route: 'homepage',
        child:[]
    },{
        title: 'Sản phẩm',
        route: 'productions',
        child: ProductCategorys
    },{
        title: 'Giỏ hàng',
        route: 'cart',
        child:[]
    },{
        title: 'Về chúng tôi',
        route: 'about-us',
        child:[]
    },{
        title: 'Liên hệ',
        route: 'contact',
        child:[]
    },
];

export interface Menu{
    title: string,
    route: string,
    child: Array<ProductCategory>
}