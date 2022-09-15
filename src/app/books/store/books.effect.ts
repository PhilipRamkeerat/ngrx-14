import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveNewBookAPI, invokeUpdateBookAPI, saveNewBookAPISuccess, updateBookAPISuccess } from "./books.action";
import { selectBooks } from "./books.selector";
// É uma classe que irá invocar serviços e se comunicar com a API
// Ela é invocada pela Action, ex: InvokeBooksApi
@Injectable()
export class BooksEffect {
  constructor(
    private action$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllBooks$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokeBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      mergeMap(([, bookFormStore]) => {
        if (bookFormStore.length > 0) {
          return EMPTY;
        }

        return this.booksService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );

        // O serviço de criação é chamado e no seu sucesso a store é atualizada com os novos valores
        return this.booksService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewBookAPISuccess({ newBook: data })
          })
        );
      })
    );
  });

  updateBookAPI$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.store.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISuccess({ updateBook: data });
          })
        );
      })
    );
  });


  deleteBooksAPI$ = createEffect(() => {
    return this.action$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });

}
