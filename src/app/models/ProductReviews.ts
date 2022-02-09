export interface ProductReviews{
    _id: string,
    product: string
    clientInformation: ClientInformation,
    content: string,
    rating: number
    createdAt: string
    updatedAt: string
}

interface ClientInformation{
    name: string,
    phoneNumber: string
}