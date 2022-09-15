import { createFeatureSelector } from "@ngrx/store";
import { Books } from "./books";

/**
 * Usado para buscar todos os dados do modulo de recursos
 */
export const selectBooks = createFeatureSelector<Books[]>('mybooks');