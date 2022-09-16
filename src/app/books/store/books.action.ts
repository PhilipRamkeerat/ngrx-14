import { createAction, props } from "@ngrx/store";
import { Books } from "./books";

export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);

// Prestar bastante atenção no nome das actions para evitar nomes repetidos
// Create Book

export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);

export const invokeSaveNewBookAPI = createAction(
  '[Books API] Invoke save new book api',
  props<{ newBook: Books }>()
);

export const saveNewBookAPISuccess = createAction(
  '[Books API] save new book api success',
  props<{ newBook: Books }>()
);

// Update book

// Trigger to the effects to execute update api call
export const invokeUpdateBookAPI = createAction(
  '[Books API] Invoke update book api',
  props<{ updateBook: Books }>()
);

export const updateBookAPISuccess = createAction(
  '[Books API] update book api success',
  props<{ updateBook: Books }>()
);

// Delete Book
export const invokeDeleteBookAPI = createAction(
  '[Books API] Invoke delete book api',
  props<{ id: number }>()
);

// Será utilizado pelo reducer para remover o livro selecionado
export const deleteBookAPISuccess = createAction(
  '[Books API] deleted book api success',
  props<{ id: number }>()
);