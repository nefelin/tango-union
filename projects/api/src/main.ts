import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');
const PORT = process.env.PORT;

async function bootstrap() {
  const schemaGenerationMode = process.env.GENERATE_ONLY;
  if (schemaGenerationMode) {
    console.info('Starting nest app to generate schema...');
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.info('Schema generated, exiting...');
    process.exit(0);
  }

  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression());
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

bootstrap();
