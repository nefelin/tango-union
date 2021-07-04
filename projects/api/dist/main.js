"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require('compression');
const PORT = process.env.PORT;
const GENERATE_FLAG = 'generateOnly';
async function bootstrap() {
    const schemaGenerationMode = process.argv.includes(GENERATE_FLAG);
    if (schemaGenerationMode) {
        console.info('Starting nest app to generate schema...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(PORT);
        console.info('Schema generated, exiting...');
        process.exit(0);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(compression());
    await app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}
bootstrap();
//# sourceMappingURL=main.js.map