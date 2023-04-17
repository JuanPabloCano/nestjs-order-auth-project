import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtGuard } from '../../adapters/auth/jwt/jwt.guard';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserService } from '../../domain/services/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  public findAllUsers(): Observable<UserEntity[]> {
    return from(this.userService.findAllUsers());
  }
}
