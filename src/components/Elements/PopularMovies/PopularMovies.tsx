import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Movie } from "@/components";
import { axios } from "@/lib";
import { MovieEntity, PopularMoviesResponse } from "@/types";

export const PopularMovies: React.FC = () => {
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
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages,
  });

  const [scrollObserverRef] = useInfiniteScroll({
    loading: isFetching && !isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!error,
  });

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error</p>
  ) : (
    <>
      {data.pages.map((group, i) => {
        return group.results.map((movie: MovieEntity) => (
          <Movie key={movie.id} movie={movie} />
        ));
      })}
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <div ref={scrollObserverRef} />
    </>
  );
};
