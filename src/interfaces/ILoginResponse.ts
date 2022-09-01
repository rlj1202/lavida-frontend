import IUser from './IUser';

export default interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
