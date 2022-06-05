import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlAuthGuard';
import { User } from '../../schemas/user.entity';
import { CurrentUser } from '../auth/currentUser';
import { UsersService } from './users.service';

@Resolver('user')
export class UsersResolver {
  constructor(readonly userService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne(user.email);
  }
}
