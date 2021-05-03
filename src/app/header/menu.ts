export const MenusList =
[
    {
        title: 'Trang chủ',
        routerLink: '/homepage',
        child:[]
    },{
        title: 'Sản phẩm',
        routerLink: '/productions',
        child:[
            {
                title: 'Cá kho',
                routerLink: '/productions/ca-kho'
            },{
                title: 'Cá tách xương',
                routerLink: '/productions/ca-tach-xuong'
            },
        ]
    },{
        title: 'Giỏ hàng',
        routerLink: '/cart',
        child:[]
    },{
        title: 'Về chúng tôi',
        routerLink: '/about-us',
        child:[]
    },{
        title: 'Liên hệ',
        routerLink: '/contact',
        child:[]
    },
];