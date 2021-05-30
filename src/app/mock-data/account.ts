import { Address } from './contact-information'

export const account: Array<Account>=
[
    {
        id: 1,
        customerCode: 'tuthan-000001',
        account: 'vuankhanh',
        password: '123123',
        name: 'Vũ An Khánh',
        phoneNumber: '',
        address: [
            {
                id: 1,
                street: 'HH4A, KĐT Tây Nam Linh Đàm',
                ward: 'Hoàng Liệt',
                district: 'Hoàng Mai',
                province: 'Hà Nội',
                position:{
                    lat: 20.963251, lng: 105.826472
                },
                isHeadquarters: true
            }
        ],
        facebookId: null,
        googleId: null,
        zaloId: null
    }
]

export interface Account{
    id: number,
    customerCode: string,
    account: string,
    password: string,
    name: string,
    phoneNumber: string,
    address: Array<Address>,
    facebookId: FacebookInformation | null,
    googleId: GoogleInformation | null,
    zaloId: ZaloInformation | null
}

export interface FacebookInformation{

}

export interface GoogleInformation{

}

export interface ZaloInformation{

}