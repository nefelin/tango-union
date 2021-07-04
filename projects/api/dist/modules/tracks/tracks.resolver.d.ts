import { TracksService } from './tracks.service';
import { RatedYoutube } from '../../schemas/tracks.entity';
import { SimpleTrack } from './dto/simpletrack.entity';
import { CompoundQueryInput } from './dto/compoundQuery.input';
import { CompoundResults } from './dto/compoundResult.entity';
export declare class TracksResolver {
    readonly tracksService: TracksService;
    constructor(tracksService: TracksService);
    getTrackLinks(trackId: number): Promise<RatedYoutube[]>;
    tracksByIds(ids: number[]): Promise<SimpleTrack[]>;
    trackByIds(id: number): Promise<SimpleTrack>;
    compoundQuery(query: CompoundQueryInput): Promise<CompoundResults>;
    getDbTracks(): Promise<{
        id: any;
        title: string;
        singer: string[];
        orchestra: string[];
        year: number;
        secondsLong: number;
        genre: string;
    }[]>;
}
