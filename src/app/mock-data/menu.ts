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
        child: []
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

export const CustomerMenu: Array<Menu> = [
    {
        icon: 'personal',
        title: 'Thông tin cá nhân',
        route: 'personal',
        child:[]
    },{
        icon: 'shopping_cart',
        title: 'Lịch sử mua hàng',
        route: 'purchase-history',
        child:[]
    },{
        icon: 'place',
        title: 'Sổ địa chỉ',
        route: 'address-book',
        child:[]
    },
]

export interface Menu{
    icon?: string;
    svgIcon?: string,
    title: string,
    route: string,
    child: Array<ProductCategory>
}