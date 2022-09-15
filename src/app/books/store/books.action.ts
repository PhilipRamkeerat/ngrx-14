import { createAction, props } from "@ngrx/store";
import { Books } from "./books";

// Invocar uma chamada de API
export const invokeBooksAPI = createAction(
  '[Books API] Invoke Books Fetch API'
);

// Enviando parametros atraves de "props", essa action salva a response da api na Store
export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);

export const invokeSaveNewBookAPI = createAction(
  '[Books API] save new book api success',
  props<{ newBook: Books }>()
);

export const saveNewBookAPISuccess = createAction(
  '[Books API] save new book api success',
  props<{ newBook: Books }>()
);