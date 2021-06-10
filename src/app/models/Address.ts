export interface Address{
    _id: number,
    street: string,
    ward: string,
    district: string,
    province: string,
    position: Position | null,
    isHeadquarters: boolean,
}

export interface Position{
    lat: number,
    lng: number
}