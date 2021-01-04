import { Module } from '@nestjs/common';
import { HydrateController } from './hydrate.controller';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../schemas/Track';
import { HydrateService } from './hydrate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [HydrateController],
  providers: [YoutubeSearchService, HydrateService],
  exports: [HydrateService],
})
export class HydrateModule {}
