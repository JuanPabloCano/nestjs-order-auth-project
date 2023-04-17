import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Builder } from 'builder-pattern';
import * as RX from 'rxjs';
import {
  Repository_key,
  Secrets,
} from '../../infrastructure/config/enums.config';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserServiceInterface } from './interfaces/user-service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(Repository_key.USER)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public findAllUsers(): RX.Observable<UserEntity[]> {
    return RX.from(this.userRepository.findAllUsers());
  }

  public login(user: UserEntity): RX.Observable<{ access_token: string }> {
    const payload = { email: user.email, document: user.document };
    const accessToken = this.jwtService.sign(payload, { secret: Secrets.JWT });
    return RX.of({ access_token: accessToken });
  }

  public validateUser(
    email: string,
    password: string,
  ): RX.Observable<UserEntity> {
    return RX.from(this.userRepository.findUserByEmail(email)).pipe(
      RX.switchMap((user) => this.isUserValid(user, password)),
      RX.catchError(() =>
        RX.throwError(() => new UnauthorizedException('Invalid credentials')),
      ),
    );
  }

  public register(user: UserEntity): RX.Observable<UserEntity> {
    return RX.from(hash(user.password, 10)).pipe(
      RX.switchMap((hash) => {
        const newUser = this.newUser(user, hash as string);
        return RX.from(this.userRepository.registerUser(newUser));
      }),
      RX.catchError((error) => RX.throwError(() => error)),
    );
  }

  private isUserValid(
    user: UserEntity,
    password: string,
  ): RX.Observable<
    RX.ObservedValueOf<RX.Observable<Omit<UserEntity, 'password'>>>
  > {
    return user
      ? RX.from(compare(password, user.password)).pipe(
          RX.switchMap((match) => this.matchPassword(match, user)),
        )
      : RX.throwError(() => new NotFoundException('User not found'));
  }

  private matchPassword<T>(
    match: T,
    user: UserEntity,
  ): RX.Observable<Omit<UserEntity, 'password'>> {
    return match
      ? RX.of(user).pipe(
          RX.map(({ password, ...userWithoutPassword }) => userWithoutPassword),
        )
      : RX.throwError(() => new UnauthorizedException('Invalid credentials'));
  }

  private newUser(user: UserEntity, hash: string): UserEntity {
    return Builder<UserEntity>()
      .fullName(user.fullName)
      .document(user.document)
      .email(user.email)
      .age(user.age)
      .password(hash)
      .build();
  }
}
