"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrateModule = void 0;
const common_1 = require("@nestjs/common");
const hydrate_controller_1 = require("./hydrate.controller");
const youtube_search_service_1 = require("../youtube-search/youtube-search.service");
const mongoose_1 = require("@nestjs/mongoose");
const tracks_entity_1 = require("../../schemas/tracks.entity");
const hydrate_service_1 = require("./hydrate.service");
let HydrateModule = class HydrateModule {
};
HydrateModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tracks_entity_1.Track.name, schema: tracks_entity_1.TrackSchema }]),
        ],
        controllers: [hydrate_controller_1.HydrateController],
        providers: [youtube_search_service_1.YoutubeSearchService, hydrate_service_1.HydrateService],
        exports: [hydrate_service_1.HydrateService],
    })
], HydrateModule);
exports.HydrateModule = HydrateModule;
//# sourceMappingURL=hydrate.module.js.map