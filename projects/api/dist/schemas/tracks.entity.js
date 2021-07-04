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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackSchema = exports.Track = exports.YoutubeLinks = exports.RatedYoutube = void 0;
const eager_import_0 = require("./tracks.entity");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
let RatedYoutube = class RatedYoutube {
    static _GRAPHQL_METADATA_FACTORY() {
        return { videoId: { nullable: false, type: () => String }, unionRating: { nullable: false, type: () => Number }, title: { nullable: false, type: () => String }, description: { nullable: false, type: () => String }, secondsLong: { nullable: false, type: () => Number }, whenPosted: { nullable: false, type: () => String }, views: { nullable: false, type: () => Number }, authorName: { nullable: false, type: () => String }, authorUrl: { nullable: false, type: () => String } };
    }
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "videoId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], RatedYoutube.prototype, "unionRating", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], RatedYoutube.prototype, "secondsLong", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "whenPosted", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], RatedYoutube.prototype, "views", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "authorName", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], RatedYoutube.prototype, "authorUrl", void 0);
RatedYoutube = __decorate([
    graphql_1.ObjectType()
], RatedYoutube);
exports.RatedYoutube = RatedYoutube;
let YoutubeLinks = class YoutubeLinks {
    static _GRAPHQL_METADATA_FACTORY() {
        return { scrapedAt: { nullable: false, type: () => Date }, links: { nullable: false, type: () => [require("./tracks.entity").RatedYoutube] } };
    }
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], YoutubeLinks.prototype, "scrapedAt", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], YoutubeLinks.prototype, "links", void 0);
YoutubeLinks = __decorate([
    graphql_1.ObjectType()
], YoutubeLinks);
exports.YoutubeLinks = YoutubeLinks;
let Track = class Track {
    static _GRAPHQL_METADATA_FACTORY() {
        return { _id: { nullable: true, type: () => String }, id: { nullable: false, type: () => Number }, genre: { nullable: true, type: () => String }, secondsLong: { nullable: true, type: () => Number }, title: { nullable: false, type: () => String }, orchestra: { nullable: true, type: () => [String] }, singer: { nullable: true, type: () => [String] }, year: { nullable: true, type: () => Number }, youtube: { nullable: true, type: () => require("./tracks.entity").YoutubeLinks }, updatedAt: { nullable: true, type: () => Date }, searchGrams: { nullable: false, type: () => String } };
    }
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Track.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], Track.prototype, "genre", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Number)
], Track.prototype, "secondsLong", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Track.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ type: [String], required: false }),
    __metadata("design:type", Array)
], Track.prototype, "orchestra", void 0);
__decorate([
    mongoose_1.Prop({ type: [String], required: false }),
    __metadata("design:type", Array)
], Track.prototype, "singer", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Number)
], Track.prototype, "year", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", YoutubeLinks)
], Track.prototype, "youtube", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Date)
], Track.prototype, "updatedAt", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], Track.prototype, "searchGrams", void 0);
Track = __decorate([
    mongoose_1.Schema({ timestamps: true })
], Track);
exports.Track = Track;
exports.TrackSchema = mongoose_1.SchemaFactory.createForClass(Track);
//# sourceMappingURL=tracks.entity.js.map