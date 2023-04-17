import { Observable } from 'rxjs';
import { UserEntity } from '../../entities/user.entity';

export type Access_token = { access_token: string };

export interface UserServiceInterface {
  validateUser(email: string, password: string): Observable<UserEntity>;

  login(user: UserEntity): Observable<Access_token>;

  register(user: UserEntity): Observable<UserEntity>;

  findAllUsers(): Observable<UserEntity[]>;
}
