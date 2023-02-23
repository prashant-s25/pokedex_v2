import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {pokedexSlice}  from './pokedexSlice';
import { createWrapper } from 'next-redux-wrapper';
import pokedexNameSlice from './pokedexDetailsSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [pokedexSlice.name]: pokedexSlice.reducer,
      [pokedexNameSlice.name]:pokedexNameSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ActionTypes extends Action,ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  ActionTypes
>;

export const wrapper = createWrapper(makeStore);
