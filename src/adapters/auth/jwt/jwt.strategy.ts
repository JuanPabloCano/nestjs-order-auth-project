import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Secrets } from '../../../infrastructure/config/enums.config';
import { UserData } from '../user.data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserData)
    private readonly userRepository: Repository<UserData>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Secrets.JWT,
    });
  }

  public validate(payload: { document: string }): Observable<any> {
    return from(this.userRepository.findOneBy({ document: payload.document }));
  }
}
