import { createReducer, on } from "@ngrx/store";
import { Books } from "./books";
import { booksFetchAPISuccess, saveNewBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),

  // Realizando a adição do novo elemento no inicio do array através do unshift
  on(saveNewBookAPISuccess, (state, { newBook }) => {
    let newState = [...state];
    newState.unshift(newBook);
    return newState;
  })
);