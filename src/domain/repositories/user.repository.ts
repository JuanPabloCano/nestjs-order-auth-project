import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  registerUser(data: UserEntity): Observable<UserEntity>;
  findUserByEmail(email: string): Observable<UserEntity>;
  findAllUsers(): Observable<UserEntity[]>;
}
