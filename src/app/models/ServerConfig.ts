export interface OrderStatus{
    numericalOrder: number,
    code: string,
    name: string
}

export interface ServerConfig{
    orderStatus: Array<OrderStatus>
}