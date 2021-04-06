import { Query, Resolver } from '@nestjs/graphql';
import { SongIndexService } from './songIndex.service';

@Resolver()
export class SongIndexResolver {
  constructor(private readonly songIndexService: SongIndexService) {}

  @Query(() => String)
  songIndexTest() {
    console.log(this.songIndexService);
    return 'hello';
  }
}
