import React, { useReducer, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
/// @ts-ignore
import Flip from "react-reveal/Flip";

import { Grid } from "@mui/material";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Movie } from "@/components";
import { axios, MovieAPI } from "@/lib";
import { MovieEntity, PopularMoviesResponse } from "@/types";

const ALWAYS_RERENDER = () => [];

export const PopularMovies: React.FC = () => {
  const [_, forceRerender] = useReducer(ALWAYS_RERENDER, []);

  const fetchPopularMovies = async ({ pageParam = 1 }) => {
    const response: PopularMoviesResponse = await axios.jsonp("movie/popular", {
      params: {
        page: pageParam,
      },
    });

    return response;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  const [scrollObserverRef] = useInfiniteScroll({
    loading: isFetching && !isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!error,
  });

  const handleAddToFavorites = (movieId: number) => {
    MovieAPI.toggleMovieById(movieId);

    forceRerender();
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error</p>
  ) : (
    <Grid container>
      {data.pages.map((group) => {
        return group.results.map((movie: MovieEntity, index: number) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} p={2}>
            <Flip left delay={index * 200} height="100%">
              <Movie movie={movie} onFavoritesToggle={handleAddToFavorites} />
            </Flip>
          </Grid>
        ));
      })}
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <div ref={scrollObserverRef} />
    </Grid>
  );
};
