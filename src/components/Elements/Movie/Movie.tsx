import React from "react";

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

import { MovieAPI } from "@/lib";
import { MovieEntity } from "@/types";

import { GenreList } from "../GenreList";

const FALLBACK_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
const IMAGE_HEIGHT = 160;

export interface MovieProps {
  movie: MovieEntity;
  onFavoriteToggle: (movieId: number) => void;
}

export const Movie: React.FC<MovieProps> = ({ movie, onFavoriteToggle }) => {
  const isInFavorites = MovieAPI.isInFavorites(movie.id);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          sx={{ height: IMAGE_HEIGHT }}
          image={
            movie.backdropPath
              ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.backdropPath}`
              : FALLBACK_URL
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
          <Button size="small" color="primary">
            More Info
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
