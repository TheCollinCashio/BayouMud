import IAddress from './IAddress'
 
export default interface IUser {
    username: string,
    email: string,
    password: string,
    address: IAddress,
    image: string,
};
