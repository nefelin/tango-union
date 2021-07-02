import { Module } from '@nestjs/common';
import { YoutubeSearchService } from './modules/youtube-search/youtube-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './modules/tracks/tracks.module';
import { HydrateModule } from './modules/hydrate/hydrate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import fs from 'fs';
import { ServeStaticModule } from '@nestjs/serve-static';

const TABS_PATH = path.resolve(__dirname, '../generated/tabs.json'); // fixme should be in config

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        const tabs = fs.existsSync(TABS_PATH) ? require(TABS_PATH) : [];
        const endpoint = 'http://localhost:4000/graphql';
        return {
          playground: {
            endpoint,
            ...(tabs ? { tabs } : {}),
          },
          autoSchemaFile: path.join(process.cwd(), 'generated/schema.gql'),
        };
      },
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/raw_tracks'),
    TracksModule,
    HydrateModule,
  ],
  controllers: [],
  providers: [YoutubeSearchService],
})
export class AppModule {}
