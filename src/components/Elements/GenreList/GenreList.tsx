import React from "react";
import { useSelector } from "react-redux";

import { Chip, Stack } from "@mui/material";

import { selectGenres } from "@/features";

export interface GenreListProps {
  genreIds: number[];
}

export const GenreList: React.FC<GenreListProps> = ({ genreIds }) => {
  const genres = useSelector(selectGenres);

  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      gap={1}
      sx={{
        "& > *": {
          marginLeft: "0 !important",
        },
      }}
    >
      {genreIds.map((id: number) => {
        const genreName = genres.find((genre) => genre.id === id)!.name;

        return <Chip key={id} label={genreName} color="primary" />;
      })}
    </Stack>
  );
};
