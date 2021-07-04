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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const r = __importStar(require("ramda"));
const common_1 = require("@nestjs/common");
const tracks_entity_1 = require("../../schemas/tracks.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const util_1 = require("./util");
const yearParser_1 = require("../../util/yearParser/yearParser");
let TracksService = class TracksService {
    constructor(trackModel) {
        this.trackModel = trackModel;
    }
    rateLink(id, videoId, ratingChange) {
        return this.trackModel
            .findByIdAndUpdate({
            id: { $eq: id },
            'links.videoId': { $eq: videoId },
        }, {
            $inc: { 'links.$.unionRating': ratingChange },
        })
            .exec();
    }
    allTracks() {
        return this.trackModel.find().exec();
    }
    sampleTracks() {
        return this.trackModel.find().limit(500).exec();
    }
    async specificTracks(ids) {
        return this.trackModel.find({ id: { $in: ids } }).exec();
    }
    async specificTrack(id) {
        return this.trackModel.findOne({ id }).exec();
    }
    async compoundSearch(input) {
        const { orchestras, singers, genres, text, sort, pagination } = input;
        const yearParser = new yearParser_1.YearParser(null);
        const years = text ? yearParser.yearsFromSearch(text) : null;
        const textWithoutYear = text ? yearParser.stripYearTerms(text) : text;
        const preppedText = util_1.andifyMongoTextSearch(textWithoutYear);
        const textMatch = (preppedText === null || preppedText === void 0 ? void 0 : preppedText.length) ? {
            $match: { $text: { $search: preppedText } },
        }
            : { $match: {} };
        const yearMatch = years
            ? {
                year: { $in: years },
            }
            : null;
        const orchestraMatch = (orchestras === null || orchestras === void 0 ? void 0 : orchestras.length) ? {
            $or: orchestras.map((name) => ({ orchestra: name })),
        }
            : null;
        const singerMatch = (singers === null || singers === void 0 ? void 0 : singers.length) ? { $or: singers.map((name) => ({ singer: name })) } : null;
        const genreMatch = (genres === null || genres === void 0 ? void 0 : genres.length) ? { $or: genres.map((name) => ({ genre: name })) } : null;
        const stripNil = r.reject(r.isNil);
        const singerCountMatches = stripNil([orchestraMatch, genreMatch, yearMatch]);
        const orchestraCountMatches = stripNil([singerMatch, genreMatch, yearMatch]);
        const genreCountMatches = stripNil([orchestraMatch, singerMatch, yearMatch]);
        const allMatches = stripNil([orchestraMatch, singerMatch, genreMatch, yearMatch]);
        const sortWithDefault = sort && Object.keys(sort).length > 0 ? sort : { title: 1 };
        const pipeline = [
            textMatch,
            {
                $facet: {
                    singerCount: [
                        {
                            $match: singerCountMatches.length ? { $and: singerCountMatches } : {},
                        },
                        { $unwind: '$singer' },
                        { $sortByCount: '$singer' },
                    ],
                    orchestraCount: [
                        {
                            $match: orchestraCountMatches.length ? { $and: orchestraCountMatches } : {},
                        },
                        { $unwind: '$orchestra' },
                        { $sortByCount: '$orchestra' },
                    ],
                    genreCount: [
                        {
                            $match: genreCountMatches.length ? { $and: genreCountMatches } : {},
                        },
                        { $unwind: '$genre' },
                        { $sortByCount: '$genre' },
                    ],
                    total: [{ $count: 'total' }],
                    tracks: [
                        {
                            $match: allMatches.length
                                ? {
                                    $and: allMatches,
                                }
                                : {},
                        },
                        { $sort: sortWithDefault },
                        pagination ? { $skip: pagination.offset } : { $skip: 0 },
                        pagination ? { $limit: pagination.limit } : { $limit: 20 },
                    ],
                },
            },
        ];
        const res = await this.trackModel.aggregate(stripNil(pipeline));
        return util_1.compoundResultsFromFacetedResults(res[0]);
    }
    async linksForTrack(id) {
        const thisSong = await this.trackModel.findOne({ id }).exec();
        if (!thisSong) {
            throw common_1.BadRequestException;
        }
        if (!thisSong.youtube) {
            throw new Error(`No links scraped for track ${id}`);
        }
        return thisSong.youtube.links;
    }
};
TracksService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(tracks_entity_1.Track.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TracksService);
exports.TracksService = TracksService;
//# sourceMappingURL=tracks.service.js.map