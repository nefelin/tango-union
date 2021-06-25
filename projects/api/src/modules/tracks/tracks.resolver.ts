import * as r from 'ramda';
import { TracksService } from './tracks.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RatedYoutube } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';

@Resolver('track')
export class TracksResolver {
  constructor(readonly tracksService: TracksService) {}

  @Query(() => [RatedYoutube], { name: 'trackSource' })
  getTrackLinks(@Args('trackId', {type: () => Number}) trackId: number) {
    return this.tracksService.linksForTrack(trackId);
  }

  @Query(() => [SimpleTrack], { name: 'tracksByIds' })
  async tracksByIds(@Args('ids', { type: () => [Number] }) ids: number[]) {
    return this.tracksService.specificTracks(ids);
  }

  @Query(() => SimpleTrack, { name: 'trackById' })
  async trackByIds(@Args('id', { type: () => Number }) id: number) {
    return this.tracksService.specificTrack(id);
  }

  @Query(() => CompoundResults)
  compoundQuery(@Args('query') query: CompoundQueryInput) {
    return this.tracksService.compoundSearch(query);
  }

  @Query(() => [SimpleTrack], { name: 'allTracks' })
  async getDbTracks() {
    const tracks = await this.tracksService.sampleTracks();
    console.log(tracks);
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
