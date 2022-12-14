import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { invokeSaveNewBookAPI } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>, // Shared or Global Store
    private router: Router
  ) { }

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0
  };

  ngOnInit(): void {
  }

  // Escutando mudanças no store global e verificando se a API salvou com sucesso, baseado no apiStatus parâmetro
  save() {
    this.store.dispatch(invokeSaveNewBookAPI({ newBook: this.bookForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }

}
