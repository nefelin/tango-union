import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IndexService } from './index.service';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';
import { SimpleTrack } from '../tracks/dto/simpletrack.entity';

@Resolver()
export class IndexResolver {
  constructor(private readonly indexService: IndexService) {}

  // @Query(() => String)
  // songIndex() {
  //   return JSON.stringify(this.indexService.getIndex().selectIndex);
  // }

  @Mutation(() => String)
  async rebuildIndex() {
    this.indexService.rebuildIndex();
    return 'Index rebuild begun...';
  }

  @Query(() => CompoundResults)
  compoundQuery(@Args('query') query: CompoundQueryInput) {
    return this.indexService.compoundSearch(query);
  }

  @Query(() => [SimpleTrack])
  hydratedQuery(@Args('query') query: CompoundQueryInput) {
    return this.indexService.hydratedResults(query);
  }
}
