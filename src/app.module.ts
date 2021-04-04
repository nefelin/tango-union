import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeSearchService } from './youtube-search/youtube-search.service';
import { logger } from './logging.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './tracks/tracks.module';
import { HydrateModule } from './hydrate/hydrate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { TrackQueriesModule } from './modules/track-queries/trackQueries.module';
import * as path from 'path';

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
  ],
  controllers: [AppController],
  providers: [AppService, YoutubeSearchService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(AppController);
  }
}
