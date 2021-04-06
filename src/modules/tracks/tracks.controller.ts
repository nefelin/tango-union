import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(readonly tracksService: TracksService) {}

  @Get('/:trackId/links')
  getTrackLinks(@Param('trackId') trackId: string) {
    return this.tracksService.linksForTrack(trackId);
  }

  @Get('db')
  getDbTracks() {
    return this.tracksService.sampleTracks();
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
