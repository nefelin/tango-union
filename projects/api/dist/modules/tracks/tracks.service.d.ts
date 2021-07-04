import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { Model } from 'mongoose';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { TrackId } from '../../types';
export declare class TracksService {
    private trackModel;
    constructor(trackModel: Model<TrackDocument>);
    rateLink(id: number, videoId: string, ratingChange: number): Promise<Track>;
    allTracks(): Promise<TrackDocument[]>;
    sampleTracks(): Promise<TrackDocument[]>;
    specificTracks(ids: TrackId[]): Promise<SimpleTrack[]>;
    specificTrack(id: TrackId): Promise<SimpleTrack>;
    compoundSearch(input: CompoundQueryInput): Promise<import("./dto/compoundResult.entity").CompoundResults>;
    linksForTrack(id: number): Promise<Track['youtube']['links']>;
}
