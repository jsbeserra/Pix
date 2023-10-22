export default interface ICache {
    find(key:string):Promise<string>
    create(key:string, data:string, expireIn: number):Promise<void>
    remove(key:string):Promise<void>
}