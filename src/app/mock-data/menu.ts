import { ProductCategory } from '../models/ProductCategory';

export const MenusList: Array<Menu> =
[
    {
        icon: 'home',
        title: 'Trang chủ',
        route: '',
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

export const SupportMenu: Array<Menu> = [
    {
        icon: 'info',
        title: 'Giới thiệu',
        route: 'about-us',
        child:[]
    },{
        icon: 'published_with_changes',
        title: 'Chính sách đổi trả',
        route: 'return-policy',
        child:[]
    },{
        icon: 'privacy_tip',
        title: 'Chính sách bảo mật',
        route: 'privacy-policy',
        child:[]
    },{
        icon: 'miscellaneous_services',
        title: 'Điều khoản dịch vụ',
        route: 'terms-of-service',
        child:[]
    },{
        icon: 'local_shipping',
        title: 'Chính sách vận chuyển',
        route: 'shipping-policy',
        child:[]
    },{
        icon: 'payment',
        title: 'Chính sách thanh toán',
        route: 'payment-policy',
        child:[]
    }
]

export interface Menu{
    icon?: string;
    svgIcon?: string,
    title: string,
    route: string,
    child: Array<ProductCategory>
}