import { ProductCategory } from '../models/ProductCategory';

export const MenusList: Array<Menu> =
[
    {
        icon: 'home',
        title: 'Trang chủ',
        route: 'homepage',
        child: []
    },{
        icon: 'store',
        title: 'Sản phẩm',
        route: 'productions',
        child: []
    },{
        icon: 'shopping_cart',
        title: 'Giỏ hàng',
        route: 'cart',
        child: []
    },
    // {
    //     icon: 'info',
    //     title: 'Về chúng tôi',
    //     route: 'about-us',
    //     child:[]
    // },{
    //     icon: 'contacts',
    //     title: 'Liên hệ',
    //     route: 'contact',
    //     child:[]
    // },
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
        route: 'order-history',
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