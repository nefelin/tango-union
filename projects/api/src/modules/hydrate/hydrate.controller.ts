import { Controller, Get, UseGuards } from '@nestjs/common';
import { HydrateService } from './hydrate.service';
import { ManagementGuard } from '../../guards/dbManagement.guard';

@Controller('hydrate')
@UseGuards(ManagementGuard)
export class HydrateController {
  constructor(private readonly hydrateService: HydrateService) {}

  @Get('stop')
  stopHydrating() {
    return this.hydrateService.stopHydrating();
  }

  @Get('start')
  startHydrating() {
    return this.hydrateService.startHydrating();
  }

  @Get('report')
  hydrationReport() {
    return this.hydrateService.report();
  }

  @Get('scoreAll')
  scoreAll() {
    this.hydrateService.rescoreAllTracks();
  }

  @Get('scoreMissing')
  scoreTracks() {
    this.hydrateService.scoreUnscoredTracks();
  }
}
