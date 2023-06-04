import { Module } from '@nestjs/common';
import { YoutubeSearchService } from './modules/youtube-search/youtube-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './modules/tracks/tracks.module';
import { HydrateModule } from './modules/hydrate/hydrate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import fs from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/health/health.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        return {
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
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [YoutubeSearchService],
})
export class AppModule {}
