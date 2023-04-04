export interface IUser {
  username: string,
  email: string,
  password: string,
}

export interface IUserWithId extends Omit<IUser, 'password'> {
  id: number,
}

export default interface IUserService {
  getAll(): Promise<IUserWithId[]>
  getById(id: number): Promise<IUserWithId>
  getByEmail(email: string): Promise<IUserWithId>
  // create(user: IUser): Promise<Omit<IUserWithId, 'password'>>
}
