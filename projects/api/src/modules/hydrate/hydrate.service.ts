import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../../schemas/tracks.entity';
import { Model } from 'mongoose';
import { YoutubeSearchService } from '../youtube-search/youtube-search.service';
import { queryStringFromSong } from '../../util';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class HydrateService {
  initialUnhydratedCount: number;
  // bar: any;
  isHydrating = false;
  startTime = Date.now();
  hydrationTick = 0;

  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private readonly youtubeSearchService: YoutubeSearchService,
  ) {}

  private hydratedCount(): Promise<number> {
    return this.trackModel
      .countDocuments({ youtube: { $exists: true } })
      .exec();
  }

  private unhydratedCount() {
    return this.initialUnhydratedCount - this.hydrationTick;
  }

  private async resetCounters() {
    this.initialUnhydratedCount = await this.trackModel
      .countDocuments({ youtube: { $exists: false } })
      .exec();
    this.hydrationTick = 0;
    this.startTime = Date.now();
  }

  async startHydrating() {
    console.log('Beginning hydration...');
    // const hydratedCount = await this.hydratedCount();
    // const total = await this.trackModel
    //   .find()
    //   .count()
    //   .exec();
    // this.bar = new ProgressBar(`  hydrating [:bar] :current/:total :percent`, {
    //   curr: hydratedCount,
    //   complete: '=',
    //   incomplete: ' ',
    //   width: 100,
    //   total,
    // });
    await this.resetCounters();
    this.isHydrating = true;
  }

  private async updateRate() {
    const timePerTrack =
      (Date.now() - this.startTime) / this.hydrationTick / 1000;
    process.stdout.write(
      ` -- hours remaining ${(
        (timePerTrack * this.unhydratedCount()) /
        3600
      ).toPrecision(4)}`,
    );
  }

  private async hydrate(track: TrackDocument) {
    const query = queryStringFromSong(track);

    const res = await this.youtubeSearchService.keylessSearch(query);

    await track
      .updateOne({
        $set: {
          youtube: {
            scrapedAt: new Date(),
            links: res,
          },
        },
      })
      .exec();
    this.handleHydrationSuccess();
  }

  private async hydrateNext() {
    const next = await this.trackModel
      .findOne({ youtube: { $exists: false } })
      .exec();
    if (!next) {
      return this.stopHydrating();
    }
    return this.hydrate(next);
  }

  stopHydrating() {
    console.log('Stopping hydration...');
    this.isHydrating = false;
  }

  async report() {
    return `Currently hydrating: ${
      this.isHydrating
    }, remaining unhydrated: ${this.unhydratedCount()}`;
  }

  handleHydrationSuccess() {
    // this.bar.tick(1);
    this.hydrationTick++;
    // this.updateRate();
  }

  @Interval(1000)
  private async autoHydrate() {
    const flip = Math.random() > 0.48;
    if (!this.isHydrating || flip) return;

    try {
      await this.hydrateNext();
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
}
