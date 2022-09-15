import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectBookById } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>) { }

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
  };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );
    // Se os dados a serem editados existirem, então recebe na variável bookForm
    fetchData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      }
      else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    // Trigger para o effect que requisita o serviço para fazer a edição passando o bookForm como payload
    this.store.dispatch(
      invokeUpdateBookAPI({ updateBook: { ...this.bookForm } })
    );

    // Verificando o status da API
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
