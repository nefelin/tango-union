import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from '../../schemas/tracks.entity';
import { IndexResolver } from './index.resolver';
import { IndexService } from './index.service';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    TracksModule,
  ],
  providers: [IndexResolver, IndexService],
  exports: [IndexService],
})
export class IndexModule {}
