export default interface IUser {
    id: string,
    username: string,
    name: string,
    create_at: Date
    passwordHash: string
}