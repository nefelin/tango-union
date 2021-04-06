import { Module } from '@nestjs/common';
import { YoutubeSearchService } from './modules/youtube-search/youtube-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './modules/tracks/tracks.module';
import { HydrateModule } from './modules/hydrate/hydrate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { TrackQueriesModule } from './modules/track-queries/trackQueries.module';
import * as path from 'path';
import { IndexModule } from './modules/index/index.module';
import { SongIndexModule } from './modules/song-index/songIndex.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'generated/schema.gql'),
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/raw_tracks'),
    TracksModule,
    HydrateModule,
    TrackQueriesModule,
    IndexModule,
    SongIndexModule,
  ],
  controllers: [],
  providers: [YoutubeSearchService],
})
export class AppModule {}
