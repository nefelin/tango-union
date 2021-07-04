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
import { ConfigModule, ConfigService } from '@nestjs/config';

const TABS_PATH = path.resolve(__dirname, '../generated/tabs.json'); // fixme should be in config
const tabEndpointHost = process.env.NODE_ENV === 'dev' ? 'http://localhost' : 'https://api.tangounion.net';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        const tabs = fs.existsSync(TABS_PATH) ? require(TABS_PATH) : [];
        const endpoint = `${tabEndpointHost}:${process.env.PORT}/graphql`;
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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ uri: configService.get('MONGODB_URI') }),
    }),
    TracksModule,
    HydrateModule,
  ],
  controllers: [],
  providers: [YoutubeSearchService],
})
export class AppModule {}
