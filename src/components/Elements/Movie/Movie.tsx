import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";

import { FALLBACK_MOVIE_IMAGE_URL } from "@/config";
import { MovieAPI } from "@/lib";
import { MovieEntity } from "@/types";

import { GenreList } from "../GenreList";

const IMAGE_HEIGHT = 160;

export interface MovieProps {
  movie: MovieEntity;
  onFavoriteToggle: (movieId: number) => void;
}

export const Movie: React.FC<MovieProps> = ({ movie, onFavoriteToggle }) => {
  const isInFavorites = MovieAPI.isInFavorites(movie.id);

  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleMovieClick}>
        <CardMedia
          sx={{ height: IMAGE_HEIGHT }}
          image={
            movie.backdropPath
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.backdropPath}`
              : FALLBACK_MOVIE_IMAGE_URL
          }
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <GenreList
            genreIds={
              movie.genreIds ||
              (movie as MovieEntity & { genres: { id: number }[] }).genres.map(
                (genre) => genre.id
              )
            }
          />
          <Typography
            mt={1}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip
          title={
            isInFavorites
              ? `Remove ${movie.title} from your Favorites`
              : `Save ${movie.title} to your favorites so you can check it in Favorites later`
          }
          arrow
        >
          <Button
            onClick={() => onFavoriteToggle(movie.id)}
            size="small"
            variant="contained"
            color={isInFavorites ? "warning" : "primary"}
          >
            {isInFavorites ? "Remove From Favorites" : "Add To Favorites"}
          </Button>
        </Tooltip>
        <Tooltip title={`Get the full information about ${movie.title}`} arrow>
          <Button onClick={handleMovieClick} size="small" color="primary">
            More Info
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
