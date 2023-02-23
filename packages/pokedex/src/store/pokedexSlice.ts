import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchRequest } from "utils";
import { AppState } from "./store";

// Type
export type PokemonData = { name: string; url: string };

// Type for our state
export interface IPokedexState {
  pokemonList: { [key: string]: PokemonData[] };
  pokemonCount: number;
  currentPage: number;
}

// Initial state
const initialState: IPokedexState = {
  pokemonList: {
    page1: [],
  },
  pokemonCount: 0,
  currentPage: 1,
};

// Actual Slice
export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    setPokemonList(state, action) {
      state.pokemonList[`page${action.payload.pageNumber}`] =
        action.payload.pokemonData;
    },
    setCount(state, action) {
      state.pokemonCount = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(HYDRATE, (state: any, action: any) => {
      if(state.currentPage>action.payload.pokedex.currentPage){
        return {
          ...state
        };
      }
      return {
        ...state,
        ...action.payload.pokedex,
      };
    });
  },
});

export const { setCount, setPokemonList, setCurrentPage } =
  pokedexSlice.actions;

// thunk

export const fetchPokemonData =
  (pageNumber: number) => async (dispatch: any, getState: () => AppState) => {
    try {
      if (
        !getState()?.pokedex?.pokemonList[`page${pageNumber}`] ||
        getState()?.pokedex?.pokemonList[`page${pageNumber}`]?.length === 0
      ) {
        const data = await fetchRequest(
          (pageNumber-1) * 20,
          20
        );
        if (data) {
          dispatch(setPokemonList({ pageNumber, pokemonData: data?.results }));
          dispatch(setCount(data?.count));
          dispatch(setCurrentPage(pageNumber));
        }
      } else {
        dispatch(setCurrentPage(pageNumber));
      }
    } catch (err: any) {
      dispatch(setPokemonList([]));
      dispatch(setCount(0));
      console.log(err?.message || "Error");
    }
  };

// Selector
export const pokemonState = (state: AppState) => state.pokedex;

export default pokedexSlice;
