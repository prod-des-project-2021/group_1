export default interface IStore {
    id: string,
    name: String,
    address: String,
    rate: Array<number>,
    price: number,
    opentime: Date,
    contact_number: String,
    description: String,
    discount_rate: number,
    instagram: String,
    createAt: Date,
    updateAt: Date,
    location: any,
    rateArv?: number
}