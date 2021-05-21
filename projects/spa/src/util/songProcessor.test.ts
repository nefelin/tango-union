const indexSongs = require("./songProcessor");
import { IndexedCategory } from "../indexer/categoryIndex";
const rawTracks = require("../../songData/testTracks.json");

const indexed = indexSongs(rawTracks);

it("should add slop to all the songs, (slop is an aggregate of most metadata minus track length", () => {
  expect(indexed.songs[1].slop).toContain("mia");
});

it("should generate the select index for each relevant category", () => {
  const categories: IndexedCategory[] = ["orchestra", "genre", "singer"];
  const catKeys = Object.keys(indexed.selectIndex);
  expect(catKeys).toEqual(categories);
});

it("should place the correct number of songs for a given selection", () => {
  expect(indexed.selectIndex.orchestra["Juan D'Arienzo"]).toHaveLength(3)
});
