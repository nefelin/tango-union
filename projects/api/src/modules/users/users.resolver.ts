import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlAuthGuard';
import { User } from '../../schemas/user.entity';
import { CurrentUser } from '../auth/currentUser';
import { UsersService } from './users.service';
import { TrackId } from '../../types';

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
  likeTrack(@CurrentUser() user: User, @Args('trackId', { type: () => String }) trackId: TrackId) {
    return this.userService.likeTrack(user.email, trackId);
  }
}
