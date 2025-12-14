import mongoose, { Schema, Document } from 'mongoose';

export interface IYoutubeLink {
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

export interface ITrack extends Document {
  id: number;
  title: string;
  singer: string[];
  orchestra: string[];
  genre: string;
  secondsLong: number;
  year: number[];
  youtube: {
    links: IYoutubeLink[];
    linkScore: number;
    flaggedForRescrape: boolean;
  };
  searchGrams?: string;
}

const YoutubeLinkSchema = new Schema<IYoutubeLink>({
  videoId: String,
  unionRating: Number,
  title: String,
  description: String,
  secondsLong: Number,
  whenPosted: String,
  views: Number,
  authorName: String,
  authorUrl: String,
});

const TrackSchema = new Schema<ITrack>(
  {
    id: { type: Number, required: true, unique: true },
    title: String,
    singer: [String],
    orchestra: [String],
    genre: String,
    secondsLong: Number,
    year: [Number],
    youtube: {
      links: [YoutubeLinkSchema],
      linkScore: Number,
      flaggedForRescrape: Boolean,
    },
    searchGrams: String,
  },
  { timestamps: true }
);

export const Track = mongoose.models.Track || mongoose.model<ITrack>('Track', TrackSchema);

