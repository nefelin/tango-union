import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import express from 'express';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

const CERT_FILE = process.env.SSL_CERT_FILE;
const PRIV_KEY = process.env.SSL_PRIVATE_KEY;

const httpsOptions = !!CERT_FILE
  ? {
      key: fs.readFileSync(PRIV_KEY),
      cert: fs.readFileSync(CERT_FILE),
    }
  : null;

async function bootstrap() {
  const schemaGenerationMode = process.env.GENERATE_ONLY;
  if (schemaGenerationMode) {
    console.info('Starting nest app to generate schema...');
    const app = await NestFactory.create(AppModule);
    await app.listen(HTTP_PORT);
    console.info('Schema generated, exiting...');
    process.exit(0);
  }

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(compression());

  http.createServer(server).listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}...`));
  if (httpsOptions) {
    https.createServer(httpsOptions, server).listen(HTTPS_PORT, () => console.log(`Listening (SSL) on port ${HTTP_PORT}...`));
  }
}

bootstrap();
