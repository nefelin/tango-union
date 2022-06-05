import { TracksService } from './tracks.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RatedYoutube } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlAuthGuard';

@Resolver('track')
export class TracksResolver {
  constructor(readonly tracksService: TracksService) {}

  @Query(() => [RatedYoutube], { name: 'linksForTracks' })
  linksForTracks(@Args('ids', { type: () => [String] }) ids: Array<string>) {
    return this.tracksService.linksForTracks(ids);
  }

  @Query(() => [SimpleTrack], { name: 'tracksByIds' })
  async tracksByIds(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.tracksService.specificTracks(ids);
  }

  @Query(() => SimpleTrack, { name: 'trackById' })
  async trackByIds(@Args('id', { type: () => String }) id: string) {
    return this.tracksService.specificTrack(id);
  }

  @Query(() => CompoundResults)
  @UseGuards(GqlAuthGuard)
  compoundQuery(@Args('query') query: CompoundQueryInput) {
    return this.tracksService.compoundSearch(query);
  }

  @Query(() => [SimpleTrack], { name: 'allTracks' })
  async getDbTracks() {
    const tracks = await this.tracksService.sampleTracks();
    return tracks.map(({ title, singer, secondsLong, orchestra, id, genre, year }) => ({
      id,
      title,
      singer,
      orchestra,
      year,
      secondsLong,
      genre,
    }));
  }
}
