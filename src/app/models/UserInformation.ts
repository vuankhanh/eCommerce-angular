import { Address } from './Address';

export interface JwtDecoded{
    data: UserInformation,
    exp: Number,
    iat: Number
}

export interface UserInformation {
    userName: String,
    password: String,
    name: String,
    email: String,
    phoneNumber: String,
    customerCode: String,
    address: Array<Address>,
    createdAt: Date,
    updatedAt: Date
}
