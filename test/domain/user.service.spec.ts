import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { Builder } from 'builder-pattern';
import { of } from 'rxjs';
import { UserEntity } from '../../src/domain/entities/user.entity';
import { UserRepository } from '../../src/domain/repositories/user.repository';
import { UserService } from '../../src/domain/services/user.service';
import { Secrets } from '../../src/infrastructure/config/enums.config';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = {
      registerUser: jest.fn(),
      findAllUsers: jest.fn(),
      findUserByEmail: jest.fn(),
    } as unknown as UserRepository;
    userService = new UserService(userRepository, new JwtService());
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe(UserService.prototype.findAllUsers, () => {
    it('Should return a list of users', () => {
      const users = getUserEntityList();

      userRepository.findAllUsers = jest.fn().mockReturnValue(of(users));
      const result = userService.findAllUsers();

      result.subscribe((userList) => {
        expect(userRepository.findAllUsers).toHaveBeenCalled();
        expect(userList).toEqual(users);
      });
    });
  });

  describe(UserService.prototype.register, () => {
    it('Should register a new user successfully', (done) => {
      const newUser = getUserEntity();

      jest
        .spyOn(hash, 'call')
        .mockImplementationOnce(() => Promise.resolve(newUser.password));
      userRepository.registerUser = jest.fn().mockReturnValueOnce(of(newUser));

      const result = userService.register(newUser);
      result.subscribe({
        next: (result) => {
          expect(userRepository.registerUser).toHaveBeenCalled();
          expect(result.fullName).toBe(newUser.fullName);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  });

  describe(UserService.prototype.login, () => {
    it('should return an access token for a given user', () => {
      const user = getUserEntity();
      const jwtService = new JwtService();

      const spy = jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue('access_token');

      const result = userService.login(user);

      result.subscribe((result) => {
        expect(spy).toHaveBeenCalledWith(
          { email: user.email, document: user.document },
          { secret: Secrets.JWT },
        );
        expect(result).toEqual({ access_token: 'access_token' });
      });
    });
  });

  describe(UserService.prototype.validateUser, () => {
    it('should throw an error when email is not found', (done) => {
      const email = 'user@example.com';
      userRepository.findUserByEmail = jest.fn().mockReturnValueOnce(of(null));

      userService.validateUser(email, 'password').subscribe({
        error: (err) => {
          expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email);
          expect(err).toBeInstanceOf(UnauthorizedException);
          done();
        },
      });
    });
  });
});

const getUserEntityList = (): UserEntity[] => {
  return [
    Builder<UserEntity>().fullName('Marcela Osorio').build(),
    Builder<UserEntity>().fullName('Pepe Rodriguez').build(),
    Builder<UserEntity>().fullName('Martina Martinez').build(),
  ];
};

const getUserEntity = (): UserEntity => {
  return Builder<UserEntity>()
    .fullName('Pepe Rodriguez')
    .document('1234567')
    .email('pepe@gmail.com')
    .age(43)
    .password('pepe123')
    .build();
};
