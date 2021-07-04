"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const youtube_search_service_1 = require("./modules/youtube-search/youtube-search.service");
const mongoose_1 = require("@nestjs/mongoose");
const tracks_module_1 = require("./modules/tracks/tracks.module");
const hydrate_module_1 = require("./modules/hydrate/hydrate.module");
const schedule_1 = require("@nestjs/schedule");
const graphql_1 = require("@nestjs/graphql");
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const TABS_PATH = path.resolve(__dirname, '../generated/tabs.json');
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, 'static'),
            }),
            graphql_1.GraphQLModule.forRootAsync({
                useFactory: async () => {
                    const tabs = fs_1.default.existsSync(TABS_PATH) ? require(TABS_PATH) : [];
                    const endpoint = 'http://localhost:4000/graphql';
                    return {
                        playground: Object.assign({ endpoint }, (tabs ? { tabs } : {})),
                        autoSchemaFile: path.join(process.cwd(), 'generated/schema.gql'),
                    };
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({ uri: configService.get('MONGODB_URI') }),
            }),
            tracks_module_1.TracksModule,
            hydrate_module_1.HydrateModule,
        ],
        controllers: [],
        providers: [youtube_search_service_1.YoutubeSearchService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map