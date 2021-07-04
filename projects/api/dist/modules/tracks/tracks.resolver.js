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
exports.TracksResolver = void 0;
const tracks_service_1 = require("./tracks.service");
const graphql_1 = require("@nestjs/graphql");
const tracks_entity_1 = require("../../schemas/tracks.entity");
const simpletrack_entity_1 = require("./dto/simpletrack.entity");
const compoundQuery_input_1 = require("./dto/compoundQuery.input");
const compoundResult_entity_1 = require("./dto/compoundResult.entity");
let TracksResolver = class TracksResolver {
    constructor(tracksService) {
        this.tracksService = tracksService;
    }
    getTrackLinks(trackId) {
        return this.tracksService.linksForTrack(trackId);
    }
    async tracksByIds(ids) {
        return this.tracksService.specificTracks(ids);
    }
    async trackByIds(id) {
        return this.tracksService.specificTrack(id);
    }
    compoundQuery(query) {
        return this.tracksService.compoundSearch(query);
    }
    async getDbTracks() {
        const tracks = await this.tracksService.sampleTracks();
        console.log(tracks);
        return tracks.map(({ title, singer, secondsLong, orchestra, id, genre, year }) => ({
            id,
            title,
            singer,
            orchestra,
            year,
            secondsLong,
            genre,
        }));
    }
};
__decorate([
    graphql_1.Query(() => [tracks_entity_1.RatedYoutube], { name: 'trackSource' }),
    __param(0, graphql_1.Args('trackId', { type: () => Number })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TracksResolver.prototype, "getTrackLinks", null);
__decorate([
    graphql_1.Query(() => [simpletrack_entity_1.SimpleTrack], { name: 'tracksByIds' }),
    __param(0, graphql_1.Args('ids', { type: () => [Number] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "tracksByIds", null);
__decorate([
    graphql_1.Query(() => simpletrack_entity_1.SimpleTrack, { name: 'trackById' }),
    __param(0, graphql_1.Args('id', { type: () => Number })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "trackByIds", null);
__decorate([
    graphql_1.Query(() => compoundResult_entity_1.CompoundResults),
    __param(0, graphql_1.Args('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compoundQuery_input_1.CompoundQueryInput]),
    __metadata("design:returntype", void 0)
], TracksResolver.prototype, "compoundQuery", null);
__decorate([
    graphql_1.Query(() => [simpletrack_entity_1.SimpleTrack], { name: 'allTracks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "getDbTracks", null);
TracksResolver = __decorate([
    graphql_1.Resolver('track'),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksResolver);
exports.TracksResolver = TracksResolver;
//# sourceMappingURL=tracks.resolver.js.map