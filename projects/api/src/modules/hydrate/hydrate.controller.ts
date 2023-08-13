import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { HydrateService } from './hydrate.service';
import { BasicGuard } from '../auth/guard-strategies';

const RESCRAPE_STALE_BATCH_SIZE = 3; // this should cover the entire library approx once a month (slightly faster) if run every five minutes
@Controller('hydrate')
export class HydrateController {
  constructor(private readonly hydrateService: HydrateService) {}

  // all of these commented functions were used locally when doing initialy scraping, leaving in place for reference
  // in case we decide to rescrape the entire lib
  // notably absent are the word stems added for better free text search

  // @Get('stop')
  // stopHydrating() {
  //   return this.hydrateService.stopHydrating();
  // }
  //
  // @Get('start')
  // startHydrating() {
  //   return this.hydrateService.startHydrating();
  // }
  //
  // @Get('report')
  // hydrationReport() {
  //   return this.hydrateService.report();
  // }
  //
  // @Get('scoreAll')
  // scoreAll() {
  //   this.hydrateService.rescoreAllTracks();
  // }
  //
  // @Get('scoreMissing')
  // scoreTracks() {
  //   this.hydrateService.scoreUnscoredTracks();
  // }

  @UseGuards(BasicGuard)
  @Post('rescrapeFlagged')
  @HttpCode(200)
  rescrapeFlagged() {
    console.log('Async rescraping flagged...');
    this.hydrateService.rescrapeFlagged();
  }

  @UseGuards(BasicGuard)
  @Post('rescrapeStale')
  @HttpCode(200)
  rescrapeStale() {
    console.log('Async rescraping stale...');
    this.hydrateService.rescrapeStale(RESCRAPE_STALE_BATCH_SIZE);
  }

  // totally the wrong place for this controller but don't really have a good admin spot at the moment
  @UseGuards(BasicGuard)
  @Get('logs')
  @HttpCode(200)
  getLogs() {
    return this.hydrateService.getLogs();
  }
}
