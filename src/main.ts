import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression());
  await app.listen(3001, () => console.log('server started...'));
}

bootstrap();
