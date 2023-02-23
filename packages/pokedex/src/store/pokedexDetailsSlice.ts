import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {  fetchRequestById } from 'utils';
import { AppState } from './store';

interface IStat{
  [key:string]:number
}
interface IPokemonDetails{
  name:string;
  abilities:string[];
  height:number;
  stats:IStat;
  types:string[];
  weight:number;
}
const initialState = {
  name:'',
  abilities:'',
  height:0,
  stats:{},
  types:'',
  weight:0,
}
  export const fetchDetailsName = createAsyncThunk(
    "user/get_pokemon_details",
    async (id: string = '') => {
      try {
        const {name,weight,types,height,abilities,stats} :any = await fetchRequestById(id);
        const pokemon = {stats:{}};
        pokemon['name'] = name;
        pokemon['abilities'] = abilities.map(ele=>ele.ability.name).join(', ');
        pokemon['height'] = height;
        for (const ele of stats) {
          console.log(ele.stat.name,ele.base_stat)
          pokemon['stats'][ele.stat.name] = ele.base_stat
        }
        pokemon['types']= types.map(ele=>ele.type.name).join(', ');
        pokemon['weight'] = weight;

        return pokemon;
      } catch (error_:unknown) {
        console.log(error_)
        throw new Error(error_ as string);
      }
    }
  );

// Actual Slice
export const pokedexDetailsSlice = createSlice({
  name: 'pokedexDetails',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(HYDRATE, (state: any, action: any) => {
      return {
        ...state,
        ...action.payload.pokedexDetails,
      };
    });
      builder.addCase(fetchDetailsName.fulfilled, (state : IPokemonDetails, action: any) => {
        state.name=action.payload.name;
        state.abilities=action.payload.abilities;
        state.height=action.payload.height;
        state.stats=action.payload.stats;
        state.types=action.payload.types;
        state.weight=action.payload.weight;
      });
    },
});


export const pokemonDetailsState = (state: AppState) => state.pokedexDetails;

export default pokedexDetailsSlice;
