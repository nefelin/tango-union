import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/Track';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [TracksController],
  providers: [TracksService, YoutubeSearchService],
  exports: [TracksService],
})
export class TracksModule {}
