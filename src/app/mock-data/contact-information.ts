export const ContactInfor: ContactInformation={
    phoneNumber: '0974017030',
    urlFacebook: 'https://www.facebook.com/ccrtuthan',
    urlZalo: 'https://zalo.me/',
    addresses: [
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
        },
        {
            id: 2,
            street: '136 Cầu Diễn',
            ward: 'Minh Khai',
            district: 'Cầu Diễn',
            province: 'Bắc Từ Liêm',
            position:{
                lat: 21.050669465111557, lng: 105.73767305644884
            },
            isHeadquarters: false
        }
      
    ]
}
export interface ContactInformation{
    phoneNumber: string,
    urlFacebook: string,
    urlZalo: string,
    addresses: Array<Address>
}

export interface Address{
    id: number,
    street: string,
    ward: string,
    district: string,
    province: string,
    position: Position,
    isHeadquarters: boolean,
}

export interface Position{
    lat: number,
    lng: number
}