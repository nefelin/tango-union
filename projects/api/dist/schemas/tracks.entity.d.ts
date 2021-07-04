import { Document } from 'mongoose';
export declare class RatedYoutube {
    videoId: string;
    unionRating: number;
    title: string;
    description: string;
    secondsLong: number;
    whenPosted: string;
    views: number;
    authorName: string;
    authorUrl: string;
}
export declare class YoutubeLinks {
    scrapedAt: Date;
    links: RatedYoutube[];
}
export declare class Track {
    _id?: string;
    id: number;
    genre?: string;
    secondsLong?: number;
    title: string;
    orchestra?: string[];
    singer?: string[];
    year?: number;
    youtube?: YoutubeLinks;
    updatedAt?: Date;
    searchGrams: string;
}
export declare type TrackDocument = Track & Document;
export declare const TrackSchema: import("mongoose").Schema<any, import("mongoose").Model<any>>;
