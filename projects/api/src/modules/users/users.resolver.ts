import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  likeTrack(@CurrentUser() user: User, @Args('trackId', { type: () => Number }) trackId: number) {
    return this.userService.likeTrack(user.email, trackId);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  unlikeTrack(@CurrentUser() user: User, @Args('trackId', { type: () => Number }) trackId: number) {
    return this.userService.unlikeTrack(user.email, trackId);
  }
}
