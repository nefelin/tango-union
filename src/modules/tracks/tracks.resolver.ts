import { TracksService } from './tracks.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RatedYoutube,} from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';

@Resolver('track')
export class TracksResolver {
  constructor(readonly tracksService: TracksService) {}

  @Query(() => [RatedYoutube], { name: 'trackSource' })
  getTrackLinks(@Args('trackId') trackId: number) {
    return this.tracksService.linksForTrack(trackId);
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
