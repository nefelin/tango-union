import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/Track';
import { SongIndexResolver } from './songIndex.resolver';
import { SongIndexService } from './songIndex.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  providers: [SongIndexResolver, SongIndexService],
})
export class SongIndexModule {}
