import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/tracks.entity';
import { TracksService } from './tracks.service';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';
import { TracksResolver } from './tracks.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [
    TracksResolver,
    TracksService,
    YoutubeSearchService,
  ],
  exports: [TracksService],
})
export class TracksModule {}
