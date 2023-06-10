import { TracksService } from './tracks.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RatedYoutube } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';
import { TrackId } from '../../types';

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
  async trackById(@Args('id', { type: () => String }) id: string) {
    return this.tracksService.specificTrack(id);
  }

  @Query(() => CompoundResults)
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

  @Mutation(() => SimpleTrack)
  flagForRescrape(@Args('trackId') trackId: TrackId) {
    return this.tracksService.flagForRescrape(trackId);
  }

  @Mutation(() => SimpleTrack)
  unflagForRescrape(@Args('trackId') trackId: TrackId) {
    return this.tracksService.unflagForRescrape(trackId);
  }
}
