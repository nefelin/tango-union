import { TrackDocument } from '../../schemas/tracks.entity';
import { Model } from 'mongoose';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';
export declare class HydrateService {
    private trackModel;
    private readonly youtubeSearchService;
    initialUnhydratedCount: number;
    isHydrating: boolean;
    startTime: number;
    hydrationTick: number;
    constructor(trackModel: Model<TrackDocument>, youtubeSearchService: YoutubeSearchService);
    private hydratedCount;
    private unhydratedCount;
    private resetCounters;
    startHydrating(): Promise<void>;
    private updateRate;
    private hydrate;
    private hydrateNext;
    stopHydrating(): void;
    report(): Promise<string>;
    handleHydrationSuccess(): void;
    private autoHydrate;
}
