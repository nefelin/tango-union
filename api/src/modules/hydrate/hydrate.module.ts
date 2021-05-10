import { Module } from '@nestjs/common';
import { HydrateController } from './hydrate.controller';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/tracks.entity';
import { HydrateService } from './hydrate.service';

// Hydrate module controls scraping youtube and hydrating tango tracks with link info
// will be used in re-hydration of tracks that need updating

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [HydrateController],
  providers: [YoutubeSearchService, HydrateService],
  exports: [HydrateService],
})
export class HydrateModule {}
