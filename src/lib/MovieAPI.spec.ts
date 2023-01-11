import { MovieAPI } from "@/lib";

describe("MovieAPI", () => {
  beforeEach(() => {
    MovieAPI.removeFromFavorites(Number.MAX_SAFE_INTEGER);
    MovieAPI.removeFromFavorites(1);
    MovieAPI.removeFromFavorites(2);
    MovieAPI.removeFromFavorites(3);
  });

  it("_ensureMovieArrayExists does not throw", () => {
    MovieAPI._ensureMovieArrayExists();
  });

  it("when id is not in favorites then returns false", () => {
    const expected = false;

    const actual = MovieAPI.isInFavorites(Number.MAX_SAFE_INTEGER);

    expect(actual).toBe(expected);
  });

  it("when movie id is not in favorites then returns false", () => {
    const expected = false;

    const actual = MovieAPI.isInFavorites(Number.MAX_SAFE_INTEGER);

    expect(actual).toBe(expected);
  });

  it("when movie id is in favorites then returns true", () => {
    const expected = true;

    MovieAPI.addToFavorites(Number.MAX_SAFE_INTEGER);

    const actual = MovieAPI.isInFavorites(Number.MAX_SAFE_INTEGER);

    expect(actual).toBe(expected);
  });

  it("should return 1,2,3 when favorite movie ids are 1, 2 and 3", () => {
    const expected = "1,2,3";

    MovieAPI.addToFavorites(1);
    MovieAPI.addToFavorites(2);
    MovieAPI.addToFavorites(3);

    const actual = MovieAPI.getFavoriteMovieIds().toString();

    expect(actual).toBe(expected);
  });

  it("should return 1,2 when favorite movie ids are 1, 2 and 3 and 3 is not favorite anymore", () => {
    const expected = "1,2";

    MovieAPI.addToFavorites(1);
    MovieAPI.addToFavorites(2);
    MovieAPI.addToFavorites(3);

    MovieAPI.removeFromFavorites(3);

    const actual = MovieAPI.getFavoriteMovieIds().toString();

    expect(actual).toBe(expected);
  });

  it("should return that 1 is not in favorites when toggled twice", () => {
    const expected = false;

    MovieAPI.toggleMovieById(1);
    MovieAPI.toggleMovieById(1);

    const actual = MovieAPI.isInFavorites(1);

    expect(actual).toBe(expected);
  });

  it("should return that 1 is in favorites when toggled once", () => {
    const expected = true;

    MovieAPI.toggleMovieById(1);

    const actual = MovieAPI.isInFavorites(1);

    expect(actual).toBe(expected);
  });
});
