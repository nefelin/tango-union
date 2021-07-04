"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tracks_entity_1 = require("../../schemas/tracks.entity");
const tracks_service_1 = require("./tracks.service");
const youtube_search_service_1 = require("../youtube-search/youtube-search.service");
const tracks_resolver_1 = require("./tracks.resolver");
let TracksModule = class TracksModule {
};
TracksModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tracks_entity_1.Track.name, schema: tracks_entity_1.TrackSchema }]),
        ],
        providers: [
            tracks_resolver_1.TracksResolver,
            tracks_service_1.TracksService,
            youtube_search_service_1.YoutubeSearchService,
        ],
        exports: [tracks_service_1.TracksService],
    })
], TracksModule);
exports.TracksModule = TracksModule;
//# sourceMappingURL=tracks.module.js.map