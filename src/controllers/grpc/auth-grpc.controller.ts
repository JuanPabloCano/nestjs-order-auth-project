import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable, switchMap } from 'rxjs';
import { UserEntity } from '../../domain/entities/user.entity';
import { Access_token } from '../../domain/services/interfaces/user-service.interface';
import { Grpc_secrets } from '../../infrastructure/config/enums.config';
import * as DTO from '../auth';
import { UserCredentials, UserEntityRequest } from './models/auth';
import { UserEntityServiceClient } from './models/auth.client';

@Controller('auth/grpc')
export class AuthGrpcController implements OnModuleInit {
  constructor(
    private userService: UserEntityServiceClient,
    @Inject(Grpc_secrets.PACKAGE) private readonly client: ClientGrpc,
  ) {}
  public onModuleInit(): any {
    this.userService = this.client.getService<UserEntityServiceClient>(
      'UserEntityServiceClient',
    );
  }

  // @Post('login')
  // public login(@Body() userLogin: UserCredentials): Observable<Access_token> {
  //   return this.userService.validateUser(userLogin).pipe(
  //     switchMap((validatedUser) => {
  //       if (!validatedUser) {
  //         throw new UnauthorizedException('Invalid credentials');
  //       }
  //       return this.userService.login(validatedUser);
  //     }),
  //   );
  // }
  //
  // @Post('register')
  // public register(
  //   @Body() userRegister: UserEntityRequest,
  // ): Observable<UserEntity> {
  //   return from(this.userService.register(userRegister));
  // }
}
