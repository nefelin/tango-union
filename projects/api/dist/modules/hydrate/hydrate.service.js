"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tracks_entity_1 = require("../../schemas/tracks.entity");
const mongoose_2 = require("mongoose");
const youtube_search_service_1 = require("../youtube-search/youtube-search.service");
const util_1 = require("../../util");
const schedule_1 = require("@nestjs/schedule");
let HydrateService = class HydrateService {
    constructor(trackModel, youtubeSearchService) {
        this.trackModel = trackModel;
        this.youtubeSearchService = youtubeSearchService;
        this.isHydrating = false;
        this.startTime = Date.now();
        this.hydrationTick = 0;
    }
    hydratedCount() {
        return this.trackModel
            .countDocuments({ youtube: { $exists: true } })
            .exec();
    }
    unhydratedCount() {
        return this.initialUnhydratedCount - this.hydrationTick;
    }
    async resetCounters() {
        this.initialUnhydratedCount = await this.trackModel
            .countDocuments({ youtube: { $exists: false } })
            .exec();
        this.hydrationTick = 0;
        this.startTime = Date.now();
    }
    async startHydrating() {
        console.log('Beginning hydration...');
        await this.resetCounters();
        this.isHydrating = true;
    }
    async updateRate() {
        const timePerTrack = (Date.now() - this.startTime) / this.hydrationTick / 1000;
        process.stdout.write(` -- hours remaining ${((timePerTrack * this.unhydratedCount()) /
            3600).toPrecision(4)}`);
    }
    async hydrate(track) {
        const query = util_1.queryStringFromSong(track);
        const res = await this.youtubeSearchService.keylessSearch(query);
        await track
            .updateOne({
            $set: {
                youtube: {
                    scrapedAt: new Date(),
                    links: res,
                },
            },
        })
            .exec();
        this.handleHydrationSuccess();
    }
    async hydrateNext() {
        const next = await this.trackModel
            .findOne({ youtube: { $exists: false } })
            .exec();
        if (!next) {
            return this.stopHydrating();
        }
        return this.hydrate(next);
    }
    stopHydrating() {
        console.log('Stopping hydration...');
        this.isHydrating = false;
    }
    async report() {
        return `Currently hydrating: ${this.isHydrating}, remaining unhydrated: ${this.unhydratedCount()}`;
    }
    handleHydrationSuccess() {
        this.hydrationTick++;
    }
    async autoHydrate() {
        const flip = Math.random() > 0.48;
        if (!this.isHydrating || flip)
            return;
        try {
            await this.hydrateNext();
        }
        catch (e) {
            console.log(e);
            process.exit(1);
        }
    }
};
__decorate([
    schedule_1.Interval(1000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HydrateService.prototype, "autoHydrate", null);
HydrateService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(tracks_entity_1.Track.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        youtube_search_service_1.YoutubeSearchService])
], HydrateService);
exports.HydrateService = HydrateService;
//# sourceMappingURL=hydrate.service.js.map