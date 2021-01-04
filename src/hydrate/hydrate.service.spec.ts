import { Test, TestingModule } from '@nestjs/testing';
import { HydrateService } from './hydrate.service';

describe('HydrateService', () => {
  let service: HydrateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HydrateService],
    }).compile();

    service = module.get<HydrateService>(HydrateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
