import { GenresState, genresReducer } from "@/features";

describe("genres reducer", () => {
  const initialState: GenresState = {
    genres: [],
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(genresReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
});
