import { Controller, Get } from '@nestjs/common';
import { HydrateService } from './hydrate.service';

@Controller('hydrate')
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
}
