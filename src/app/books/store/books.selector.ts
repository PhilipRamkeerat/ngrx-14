import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";

/**
 * Usado para buscar todos os dados do modulo de recursos
 */
export const selectBooks = createFeatureSelector<Books[]>('mybooks');

export const selectBookById = (bookId: number) =>
  // Here 'createSelector' is used to fetch the slice of data from the ngrx store.
  createSelector(selectBooks, (books: Books[]) => {
    var bookById = books.filter((_) => _.id == bookId);
    if (bookById.length == 0) {
      return null;
    }

    return bookById[0];
  });