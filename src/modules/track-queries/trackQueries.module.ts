import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/Track';
import { TrackQueriesResolver } from './TrackQueries.resolver';
import { TrackQueriesService } from './trackQueries.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [TrackQueriesResolver, TrackQueriesService],
})
export class TrackQueriesModule {}
