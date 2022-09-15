import { createReducer } from "@ngrx/store";
import { Books } from "./books";

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState
);