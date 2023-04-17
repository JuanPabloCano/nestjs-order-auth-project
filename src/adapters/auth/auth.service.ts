import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, Observable, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ThrowConflictException } from '../../infrastructure/exceptions/conflict.exception';
import { UserData } from './user.data';

@Injectable()
export class AuthService implements UserRepository {
  constructor(
    @InjectRepository(UserData)
    private readonly userRepository: Repository<UserData>,
  ) {}

  public findUserByEmail(email: string): Observable<UserEntity> {
    return from(this.userRepository.findOneBy({ email })).pipe(
      catchError(() =>
        throwError(() => new NotFoundException('User not found')),
      ),
    );
  }

  public registerUser(data: UserEntity): Observable<UserEntity> {
    return from(this.userRepository.save(data)).pipe(
      catchError(() =>
        throwError(() => ThrowConflictException('User', data.document)),
      ),
    );
  }

  public findAllUsers(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }
}
