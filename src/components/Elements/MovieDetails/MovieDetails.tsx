/// @ts-ignore
import Flip from "react-reveal/Flip";

import { Button, Card, Grid, Link, styled, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { GenreList, Movie } from "@/components";
import { FALLBACK_MOVIE_IMAGE_URL } from "@/config";
import { axios, MovieAPI } from "@/lib";
import { MovieEntity, VerboseMovieEntity } from "@/types";

export interface MovieDetailsProps {
  movie: VerboseMovieEntity;
  onFavoriteToggle: (movieId: number) => void;
}

export const MovieDetailsContainer = styled("main")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  padding: 16,
});

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onFavoriteToggle,
}) => {
  const fetchRecommendedMovies = async (): Promise<{
    results: MovieEntity[];
  }> =>
    (await axios.jsonp(`movie/${movie.id}/recommendations`)) as unknown as {
      results: MovieEntity[];
    };

  const { data: recommendedMovies, status: recommendedMoviesStatus } = useQuery(
    {
      queryKey: ["movies", movie.id, "recommended"],
      queryFn: fetchRecommendedMovies,
    }
  );

  const fetchSimilarMovies = async (): Promise<{ results: MovieEntity[] }> =>
    (await axios.jsonp(`movie/${movie.id}/similar`)) as unknown as {
      results: MovieEntity[];
    };

  const { data: similarMovies, status: similarMoviesStatus } = useQuery({
    queryKey: ["movies", movie.id, "similar"],
    queryFn: fetchSimilarMovies,
  });

  const isInFavorites = MovieAPI.isInFavorites(movie.id);

  return (
    <MovieDetailsContainer>
      <Card>
        <Typography variant="h3">{movie.title}</Typography>
        <img
          src={
            movie.backdropPath
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.backdropPath}`
              : FALLBACK_MOVIE_IMAGE_URL
          }
          loading="eager"
          style={{ width: "100%" }}
        />
      </Card>
      <Card>
        <Typography variant="h4">Main Information</Typography>
        <Typography>
          <b>Age Restriction:</b> {movie.adult ? "For Adults" : "For Kids"}
        </Typography>
        <Typography>
          {movie.belongsToCollection
            ? "Belongs to collection"
            : "Does not belong to collection"}
        </Typography>
        <Typography>Budget: ${movie.budget}</Typography>
        <Button
          onClick={() => onFavoriteToggle(movie.id)}
          size="small"
          variant="contained"
          color={isInFavorites ? "warning" : "primary"}
        >
          {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
        </Button>
      </Card>
      <Card sx={{ gridColumn: "1 / 3" }}>
        <Typography variant="h4">Genres</Typography>
        <GenreList genreIds={movie.genres.map((genre) => genre.id)} />
      </Card>
      <Card sx={{ gridColumn: "1 / 3" }}>
        <Typography variant="h4">Additional Information</Typography>
        {movie.homepage && (
          <Typography>
            Homepage: <Link href={movie.homepage} />
          </Typography>
        )}
        <Typography>Movie Identifier: {movie.id}</Typography>
        <Typography>IMDB Identifier: {movie.imdbId}</Typography>
      </Card>
      <Card sx={{ gridColumn: "1 / 3" }}>
        <Typography variant="h4">Movie External Information</Typography>
        <Typography>Spoken in {movie.originalLanguage}</Typography>
        <Typography>Original Title: {movie.originalTitle}</Typography>
        {movie.overview ? (
          <Typography>{movie.overview}</Typography>
        ) : (
          <Typography>Movie Has No Overview</Typography>
        )}
        <Typography>Popularity: {movie.popularity.toFixed(1)}</Typography>
      </Card>
      <Card>
        <Typography variant="h4">Production Companies</Typography>
        <ul>
          {movie.productionCompanies.map((company) => (
            <li>
              <Typography>{company.name}</Typography>
              <Typography>Country: {company.originCountry}</Typography>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <Typography variant="h4">Production Countries</Typography>
        <ul>
          {movie.productionCountries.map((country) => (
            <li>
              <Typography>{country.name}</Typography>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <Typography variant="h4">Spoken Languages</Typography>
        <ul>
          {movie.spokenLanguages.map((language) => (
            <li>
              <Typography>{language.name}</Typography>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <Typography variant="h4">Meta</Typography>
        {movie.tagline && <Typography>Tagline: {movie.tagline}</Typography>}
        {movie.title && <Typography>Tagline: {movie.title}</Typography>}
        <Typography>
          {movie.video ? "Has A Video" : "Does Not Have A Video"}
        </Typography>
        <Typography>Average Vote: {movie.voteAverage.toFixed(1)}/10</Typography>
        <Typography>Vote Count: {movie.voteCount}</Typography>
      </Card>
      <section>
        <Typography variant="h4">Recommended Movies Like This</Typography>
        {(recommendedMovies?.results || []).map((movie: MovieEntity) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} p={2}>
            <Flip left height="100%">
              <Movie movie={movie} onFavoriteToggle={onFavoriteToggle} />
            </Flip>
          </Grid>
        ))}
      </section>
      <section>
        <Typography variant="h4">Similar Movies</Typography>
        {(similarMovies?.results || []).map((movie: MovieEntity) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} p={2}>
            <Flip left height="100%">
              <Movie movie={movie} onFavoriteToggle={onFavoriteToggle} />
            </Flip>
          </Grid>
        ))}
      </section>
    </MovieDetailsContainer>
  );
};
