import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get('db')
  getDbTracks() {
    return this.tracksService.dbTracks();
  }

  @Post('/:trackId/link/:videoId/upvote')
  upvoteLink(
    @Param('trackId', ParseIntPipe) trackId: number,
    @Param('videoId') videoId: string,
  ) {
    return this.tracksService.rateLink(trackId, videoId, 1);
  }

  @Post('/:trackId/link/:videoId/downvote')
  downvoteLink(
    @Param('trackId', ParseIntPipe) trackId: number,
    @Param('videoId') videoId: string,
  ) {
    return this.tracksService.rateLink(trackId, videoId, -1);
  }
}
