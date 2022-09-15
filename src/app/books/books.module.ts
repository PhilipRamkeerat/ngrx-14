import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AddComponent } from './add/add.component';
import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksEffect } from './store/books.effect';
import { bookReducer } from './store/books.reducer';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('mybooks', bookReducer),
    EffectsModule.forFeature([BooksEffect]),
    FormsModule
  ]
})
export class BooksModule { }
