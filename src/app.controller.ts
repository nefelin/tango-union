import * as r from 'ramda';
import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService, Person } from './app.service';
import { TracksService } from './tracks/tracks.service';
import { YoutubeSearchService } from './youtube-search/youtube-search.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly trackService: TracksService,
    private readonly youtubeSearchService: YoutubeSearchService,
  ) {}

  @Post('person')
  postPerson(@Body() person: Person) {
    return this.appService.addPerson(person);
  }

  @Get('people')
  allPeople() {
    return this.appService.allPeople();
  }
}
