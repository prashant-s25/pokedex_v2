import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {  fetchRequestById } from 'utils';

interface IStat{
  [key:string]:number
}
interface IPokemonName{
  name:string;
  abilities:string[];
  height:number;
  stats:IStat;
  types:string[];
  weight:number;
}
const initialState = {
  name:'',
  abilities:[],
  height:0,
  stats:{},
  types:[],
  weight:0,
}
  export const fetchPokemonName = createAsyncThunk(
    "user/get_pokemon_details",
    async (id: string = '') => {
      try {
        const {name,weight,types,height,abilities,stats} :any = await fetchRequestById(id);
        console.log(name,'name slice')
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
export const pokedexNameSlice = createSlice({
  name: 'pokedexName',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(HYDRATE, (state: any, action: any) => {
      return {
        ...state,
        ...action.payload.pokedexName,
      };
    });
      builder.addCase(fetchPokemonName.fulfilled, (state : IPokemonName, action: any) => {
        console.log({payload:action.payload})
        state.name=action.payload.name;
        state.abilities=action.payload.abilities;
        state.height=action.payload.height;
        state.stats=action.payload.stats;
        state.types=action.payload.types;
        state.weight=action.payload.weight;
      });
    },
});


export const pokemonNameState = (state: any) => state.pokedexName;

export default pokedexNameSlice;
