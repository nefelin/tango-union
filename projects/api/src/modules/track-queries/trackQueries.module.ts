import { Module } from '@nestjs/common';
import { TrackQueriesResolver } from './TrackQueries.resolver';
import { TrackQueriesService } from './trackQueries.service';
import { IndexModule } from '../index/index.module';

@Module({
  imports: [IndexModule],
  providers: [TrackQueriesResolver, TrackQueriesService],
})

export class TrackQueriesModule {}
