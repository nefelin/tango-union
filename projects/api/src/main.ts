import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { testFn } from 'union_index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');
const PORT = 4000;

async function bootstrap() {
  testFn('Hello world');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression());
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

bootstrap();
