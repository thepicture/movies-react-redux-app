import { JSONLocalStorage } from "@/utils";

export class MovieAPI {
  static FAVORITE_MOVIE_IDS_KEY = "favoriteMovieIds";

  static addToFavorites(movieId: number): void {
    this._ensureMovieArrayExists();

    JSONLocalStorage.pushToArray(this.FAVORITE_MOVIE_IDS_KEY, movieId);
  }

  static removeFromFavorites(movieId: number): void {
    this._ensureMovieArrayExists();

    JSONLocalStorage.removeFromArray<number>(
      this.FAVORITE_MOVIE_IDS_KEY,
      movieId
    );
  }

  static getFavoriteMovieIds(): number[] {
    this._ensureMovieArrayExists();

    return JSONLocalStorage.get<number[]>(this.FAVORITE_MOVIE_IDS_KEY);
  }

  static isInFavorites(movieId: number): boolean {
    this._ensureMovieArrayExists();

    return JSONLocalStorage.get<number[]>(this.FAVORITE_MOVIE_IDS_KEY).includes(
      movieId
    );
  }

  static toggleMovieById(movieId: number) {
    if (this.isInFavorites(movieId)) {
      this.removeFromFavorites(movieId);
    } else {
      this.addToFavorites(movieId);
    }
  }

  static _ensureMovieArrayExists() {
    if (!JSONLocalStorage.doesExist(this.FAVORITE_MOVIE_IDS_KEY)) {
      JSONLocalStorage.set<number[]>(this.FAVORITE_MOVIE_IDS_KEY, []);
    }
  }
}
