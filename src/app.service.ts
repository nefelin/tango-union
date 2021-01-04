import { Injectable } from '@nestjs/common';
import { TracksService } from './tracks/tracks.service';

export interface Person {
  name: string;
  age: number;
}

@Injectable()
export class AppService {
  constructor(private readonly tracksService: TracksService) {}
  db: Record<string, Person> = {};

  addPerson(p: Person): Person {
    this.db[p.name] = p;
    console.log({ db: this.db, person: p });
    return p;
  }

  allPeople(): Person[] {
    return Object.values(this.db);
  }
}
