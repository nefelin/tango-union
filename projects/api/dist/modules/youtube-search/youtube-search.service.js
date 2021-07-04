"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSearchService = void 0;
const common_1 = require("@nestjs/common");
const yt_search_1 = __importDefault(require("yt-search"));
let YoutubeSearchService = class YoutubeSearchService {
    async keylessSearch(query) {
        const res = await yt_search_1.default(query);
        return res.videos.map(youtubeVideoFromVideoSearchResult);
    }
};
YoutubeSearchService = __decorate([
    common_1.Injectable()
], YoutubeSearchService);
exports.YoutubeSearchService = YoutubeSearchService;
const youtubeVideoFromVideoSearchResult = (res) => ({
    unionRating: 0,
    videoId: res.videoId,
    title: res.title,
    description: res.description,
    secondsLong: res.seconds,
    whenPosted: res.ago,
    views: res.views,
    authorName: res.author.name,
    authorUrl: res.author.url,
});
//# sourceMappingURL=youtube-search.service.js.map