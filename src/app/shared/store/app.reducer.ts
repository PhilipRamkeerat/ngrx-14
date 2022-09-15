import { createReducer, on } from "@ngrx/store";
import { setAPIStatus } from "./app.action";
import { Appstate } from "./appstate";


export const initialState: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: ''
};

// created the 'appReducer'. Registered the 'setAPIStatus' action for generating the new state.
export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  })
);