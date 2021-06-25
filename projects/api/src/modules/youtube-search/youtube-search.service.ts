import { Injectable } from '@nestjs/common';
import yts, { VideoSearchResult } from 'yt-search';
import { RatedYoutube } from '../../schemas/tracks.entity';

@Injectable()
export class YoutubeSearchService {
  async keylessSearch(query: string): Promise<RatedYoutube[]> {
    const res = await yts(query);
    return res.videos.map(youtubeVideoFromVideoSearchResult);
  }
}

const youtubeVideoFromVideoSearchResult = (
  res: VideoSearchResult,
): RatedYoutube => ({
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