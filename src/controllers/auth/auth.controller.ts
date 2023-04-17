import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable, switchMap } from 'rxjs';
import { UserEntity } from '../../domain/entities/user.entity';
import { Access_token } from '../../domain/services/interfaces/user-service.interface';
import { UserService } from '../../domain/services/user.service';
import * as DTO from './index';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  public login(@Body() userLogin: DTO.UserLoginDto): Observable<Access_token> {
    return this.userService
      .validateUser(userLogin.email, userLogin.password)
      .pipe(
        switchMap((validatedUser) => {
          if (!validatedUser) {
            throw new UnauthorizedException('Invalid credentials');
          }
          return this.userService.login(validatedUser);
        }),
      );
  }

  @Post('register')
  public register(
    @Body() userRegister: DTO.UserRegisterDto,
  ): Observable<UserEntity> {
    return from(this.userService.register(userRegister));
  }
}
