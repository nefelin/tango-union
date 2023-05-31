import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as http from 'http';
import express from 'express';
import path from 'path';
import { ValidationPipe } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');
const HTTP_PORT = 4000;

async function bootstrap() {
  const schemaGenerationMode = process.env.GENERATE_ONLY;
  if (schemaGenerationMode) {
    console.info('Starting nest app to generate schema....');
    const app = await NestFactory.create(AppModule);
    await app.listen(HTTP_PORT);
    console.info('Schema generated, exiting...');
    process.exit(0);
  }

  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  const publicPath = path.join(__dirname, '../public');
  app.useStaticAssets(publicPath);
  app.use(compression());

  // cors stuff
  const whitelist = [
    'https://www.tangounion.net',
    'https://tangounion.net',
    'http://localhost:3000',
    'http://localhost:4000',
    undefined,
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        // console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        // console.error('blocked cors for:', origin);
        callback(null, false);
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  http.createServer(server).listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}...`));
}

bootstrap();
