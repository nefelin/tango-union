import { TracksService } from './tracks.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RatedYoutube } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundResults } from '../index/dto/compoundResult.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';

@Resolver('track')
export class TracksResolver {
  constructor(readonly tracksService: TracksService) {}

  @Query(() => [RatedYoutube], { name: 'trackSource' })
  getTrackLinks(@Args('trackId') trackId: number) {
    return this.tracksService.linksForTrack(trackId);
  }

  @Query(() => [SimpleTrack], { name: 'tracksByIds' })
  tracksByIds(@Args('trackIds', { type: () => [Number] }) trackIds: number[]) {
    return this.tracksService.specificTracks(trackIds);
  }

  @Query(() => CompoundResults)
  compoundQuery(@Args('query') query: CompoundQueryInput) {
    return this.tracksService.compoundSearch(query);
  }

  @Query(() => [SimpleTrack], { name: 'allTracks' })
  async getDbTracks() {
    const tracks = await this.tracksService.sampleTracks();
    console.log(tracks);
    return tracks.map(
      ({ title, singer, secondsLong, orchestra, trackId, genre, year }) => ({
        trackId,
        title,
        singer,
        orchestra,
        year,
        secondsLong,
        genre,
      }),
    );
  }
}
