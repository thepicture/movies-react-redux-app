import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app";
import { axios } from "@/lib";
import { GenreEntity } from "@/types";

export interface GenresState {
  genres: GenreEntity[];
  status: "idle" | "loading" | "failed";
}

const initialState: GenresState = {
  genres: [],
  status: "idle",
};

export const fetchGenresAsync = createAsyncThunk(
  "genres/fetchGenres",
  async () => {
    try {
      const response: { genres: GenreEntity[] } = await axios.jsonp(
        "/genre/movie/list"
      );

      return response.genres;
    } catch (error) {
      console.error(`Error during fetching genres: ${error}`);
      return [];
    }
  }
);

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenresAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenresAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.genres = action.payload;
      })
      .addCase(fetchGenresAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectGenres = (state: RootState) => state.genres.genres;

export const genresReducer = genresSlice.reducer;
