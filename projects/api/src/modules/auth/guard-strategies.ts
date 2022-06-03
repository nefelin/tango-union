import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
