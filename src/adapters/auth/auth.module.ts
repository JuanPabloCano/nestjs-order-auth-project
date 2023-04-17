import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '../../controllers/auth/auth.controller';
import { UserService } from '../../domain/services/user.service';
import { Secrets } from '../../infrastructure/config/enums.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: Secrets.JWT,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [UserService, AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
  exports: [UserService, JwtStrategy, AuthService],
})
export class AuthModule {}
