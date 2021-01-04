import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeSearchService } from './youtube-search.service';

describe('YoutubeSearchService', () => {
  let service: YoutubeSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeSearchService],
    }).compile();

    service = module.get<YoutubeSearchService>(YoutubeSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
