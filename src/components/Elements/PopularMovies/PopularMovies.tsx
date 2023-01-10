import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Movie } from "@/components";
import { axios } from "@/lib";
import { MovieEntity } from "@/types";

export const PopularMovies: React.FC = () => {
  const fetchPopularMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get("movie/popular", {
      params: {
        page: pageParam,
      },
    });

    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => lastPage.page < lastPage["total_pages"],
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
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
