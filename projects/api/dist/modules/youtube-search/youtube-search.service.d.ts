import { RatedYoutube } from '../../schemas/tracks.entity';
export declare class YoutubeSearchService {
    keylessSearch(query: string): Promise<RatedYoutube[]>;
}
